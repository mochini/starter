import aws from '../../lib/aws'

const s3 = new aws.S3()

export const readFile = async (Key) => {
  const chunk = await s3.getObject({
    Bucket: process.env.AWS_ASSET_BUCKET,
    Key
  }).promise()
  return chunk.Body
}

export const listFiles = async (Prefix) => {
  const parts = await s3.listObjects({
    Bucket: process.env.AWS_ASSET_BUCKET,
    Prefix
  }).promise()
  return parts.Contents.map(file => file.Key)
}

export const saveFile = async (filedata, filepath, content_type) => {
  await s3.upload({
    ACL: 'public-read',
    Body: filedata,
    Bucket: process.env.AWS_ASSET_BUCKET,
    ContentType: content_type,
    Key: filepath
  }).promise()
}

export const deleteFiles = async (filepaths) => {
  await s3.deleteObjects({
    Bucket: process.env.AWS_ASSET_BUCKET,
    Delete: {
      Objects: filepaths.map(Key => ({ Key }))
    }
  }).promise()
}
