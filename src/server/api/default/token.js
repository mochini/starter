import { decode } from '../../utils/jwt'
import User from '../../models/user'

const router = async (req, res, next) => {

  const token = req.headers.authorization

  if(!token) return res.status(401).json({
    message: res.t('No token')
  })

  const matches = token.match(/Bearer (.*)/)

  if(!matches) return res.status(401).json({
    message: res.t('Invalid token')
  })

  const { err, user_id } = decode(matches[1])

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
