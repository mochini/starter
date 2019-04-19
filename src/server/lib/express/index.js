import multiparty from 'connect-multiparty'
import withTransaction from './transaction'
import imagecache from './imagecache'
import bodyParser from 'body-parser'
import 'express-async-errors'
import express from 'express'
import logger from './logger'
import format from './format'
import arena from './arena'
import api from '../../api'
import i18n from '../i18n'
import ping from './ping'
import path from 'path'
import './responder'
import qs from 'qs'

const creator = () => {

  const server = express()

  server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

  server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

  server.use(bodyParser.json({ limit: '5mb' }))

  server.use(multiparty({ uploadDir: './tmp' }))

  server.use(i18n.init)

  server.use(express.static(path.join(__dirname, '..', '..', '..', 'app', 'public')))

  server.use('/locales', express.static(path.join(__dirname, '..', '..', '..', 'locales')))

  server.use(withTransaction)

  if(process.env.NODE_ENV !== 'production') server.use(logger)

  server.use('/imagecache', imagecache)

  server.use('/ping', ping)

  server.use(arena)

  server.use(format)

  server.use('/api', api)

  return server

}

export default creator
