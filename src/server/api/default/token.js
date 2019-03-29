import { decode } from '../../utils/jwt'
import User from '../../models/user'

const getToken = (req, res) => {

  if(req.query.token) return req.query.token

  if(!req.headers.authorization) return null

  const token = req.headers.authorization

  const matches = token.match(/Bearer (.*)/)

  return matches[1]

}

const router = async (req, res, next) => {

  const token = getToken(req, res)

  if(!token) return res.status(401).json({
    message: res.t('No token')
  })

  const { err, user_id } = decode(token)

  if(err && err === 'jwt expired') return res.status(401).json({
    message: res.t('Expired token')
  })

  const user = await User.where({
    id: user_id
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(401).json({
    message: res.t('Invalid user')
  })

  req.user = user

  next()

}

export default router
