import { checkUploadedFile } from '../../services/assets'

const route = async (req, res) => {

  const exists = await checkUploadedFile(req, req.trx)

  if(!exists) return res.status(204).send('not found')

  res.status(200).send('found')

}

export default route
