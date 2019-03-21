import AssembleAssetQueue from '../../queues/assemble_asset_queue'
import AssetSerializer from '../../serializers/asset_serializer'
import Asset from '../../models/asset'
import request from 'request-promise'
import * as local from './local'
import * as aws from './aws'
import sharp from 'sharp'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const backend = process.env.ASSET_STORAGE === 's3' ? aws : local

export const checkUploadedFile = async (req, trx) => {
  const chunkFilename = _getChunkFilename(req.query.resumableIdentifier, req.query.resumableChunkNumber)
  return await _chunkExists(chunkFilename)
}

export const uploadChunk = async (req, trx) => {
  const identifier = _cleanIdentifier(req.body.resumableIdentifier)
  const chunkFilename = _getChunkFilename(identifier, req.body.resumableChunkNumber)
  fs.renameSync(req.files['file'].path, chunkFilename)
  const filedata = fs.readFileSync(chunkFilename)
  await _saveFile(filedata, chunkFilename, 'application/octet-stream')
  await _unlinkChunk(chunkFilename)
  const chunks = await _listChunks()
  const chunkArray = [...Array(parseInt(req.body.resumableTotalChunks))]
  const completed = chunkArray.reduce((completed, chunk, index) => {
    return completed ? _.includes(chunks, _getChunkFilename(identifier, index + 1)) : false
  }, true)
  if(!completed) return 'partly_done'
  const asset = await Asset.forge({
    original_file_name: req.body.resumableFilename,
    file_name: _getNormalizedFileName(req.body.resumableFilename),
    content_type: req.body.resumableType,
    file_size: req.body.resumableTotalSize,
    chunks_total: req.body.resumableTotalChunks,
    status: 'chunked'
  }).save(null, { transacting: trx })
  if(!asset) throw new Error('Unable to create asset')
  await AssembleAssetQueue.add({ id: asset.id })
  return AssetSerializer(asset)
}

export const createAssetFromUrl = async (url, trx) => {
  const response = await request.get({
    url,
    resolveWithFullResponse: true,
    encoding: null
  }).promise().then(response => response.toJSON())
  const content_type = response.headers['content-type']
  const asset = await createAsset({
    content_type,
    file_size: response.headers['content-length'],
    file_name: content_type.replace('image/', 'profile.'),
    file_data: response.body
  }, trx)
  return asset
}

export const assembleAsset = async (id, trx) => {
  const asset = await Asset.where({ id }).fetch({ transacting: trx })
  const fileData = await _getAssembledData(asset)
  const dimensions = await _getDimensions(fileData)
  const normalizedData = await _getNormalizedData(asset, fileData)
  await _saveFile(normalizedData, `assets/${asset.get('id')}/${asset.get('file_name')}`, asset.get('content_type'))
  await _deleteChunks(asset)
  await asset.save({
    ...dimensions,
    status: 'assembled'
  }, { transacting: trx })
}

export const createAsset = async (meta, trx) => {
  const dimensions = await _getDimensions(meta.file_data)
  const asset = await Asset.forge({
    original_file_name: meta.file_name,
    file_name: _getNormalizedFileName(meta.file_name),
    content_type: meta.content_type || _getContentType(meta.file_name),
    file_size: meta.file_size || _getFilesize(meta.file_data),
    chunks_total: 1,
    status: 'assembled',
    ...dimensions
  }).save(null, { transacting: trx })
  const normalizedData = await _getNormalizedData(asset, meta.file_data)
  await _saveFile(normalizedData, `assets/${asset.get('id')}/${asset.get('file_name')}`, asset.get('content_type'))
  return asset
}

const _getDimensions = async (data) => {
  const dimension = await sharp(data).metadata()
  return {
    width: dimension.orientation > 4 ? dimension.height : dimension.width,
    height: dimension.orientation > 4 ? dimension.width : dimension.height
  }
}

const _getNormalizedData = async (asset, fileData) => {
  const content_type = asset.get('content_type')
  const isImage = content_type.match(/image/) && content_type !== 'image/gif'
  return isImage ? await _rotateImage(fileData) : fileData
}

const _rotateImage = async (data) => {
  return await sharp(data).withMetadata().rotate().toBuffer()
}

const _chunkExists = async (filepath) => {
  const chunks = await _listChunks()
  return _.includes(chunks, filepath)
}

const _listChunks = async () => {
  return await backend.listFiles('tmp')
}

const _saveFile = async (filedata, filepath, content_type) => {
  return await backend.saveFile(filedata, filepath, content_type)
}

const _unlinkChunk = async (filepath) => {
  fs.unlinkSync(filepath)
}

const _getContentType = (file_name) => {
  const ext = path.extname(file_name)
  if(ext === '.jpg') return 'image/jpeg'
  if(ext === '.jpeg') return 'image/jpeg'
  if(ext === '.png') return 'image/png'
  if(ext === '.gif') return 'image/gif'
}

const _getFilesize = (fileData) => {
  const random = _.random(100000000, 999999999).toString(36)
  const filePath = path.join('tmp', random)
  fs.writeFileSync(filePath, fileData)
  const fileStats = fs.statSync(filePath)
  fs.unlinkSync(filePath)
  return fileStats.size
}

export const _getNormalizedFileName = (filename) => {
  const matches = filename.toLowerCase().match(/^(.*)\.([^?]*)\??(.*)$/)
  const basename = matches ? matches[1] : filename.toLowerCase()
  const extension = matches ? matches[2] : null
  const rewritten = basename.replace(/[^0-9a-zA-Z-\s_.]/img, '').replace(/[\W_]/img, '-').replace(/-{2,}/g, '-')
  return rewritten + (extension ? `.${extension}` : '')
}

const _getAssembledData = async (asset) => {
  const chunks = await _getChunks(asset)
  return Buffer.concat(chunks)
}

const _getChunks = async (asset) => {
  const totalChunks = parseInt(asset.get('chunks_total'))
  const chunkArray = [...Array(parseInt(totalChunks))]
  return await Promise.mapSeries(chunkArray, async (item, index) => {
    return await backend.readFile(path.join('tmp', `${asset.get('identifier')}.${index + 1}`))
  })
}

const _deleteChunks = async (asset) => {
  const totalChunks = parseInt(asset.get('chunks_total'))
  const chunkArray = [...Array(parseInt(totalChunks))]
  const filepaths = chunkArray.map((i, index) => {
    return _getChunkFilename(asset.get('identifier'), index + 1)
  })
  backend.deleteFiles(filepaths)
}

const _cleanIdentifier = identifier => {
  return identifier.replace(/^0-9A-Za-z_-/img, '')
}

const _getChunkFilename = (identifier, chunkNumber, ) => {
  return path.join('tmp', `${_cleanIdentifier(identifier)}.${chunkNumber}`)
}
