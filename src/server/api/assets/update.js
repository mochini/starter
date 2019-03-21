import { uploadChunk } from '../../services/assets'

const route = async (req, res) => {

  const data = await uploadChunk(req, req.trx)

  res.status(200).json({ data })

}

export default route
