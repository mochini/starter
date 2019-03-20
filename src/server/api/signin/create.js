import { encode } from '../../lib/jwt'
import User from '../../models/user'
import Checkit from  'checkit'

const route = async (req, res) => {

  const checkit = new Checkit({
    email: 'required',
    password: 'required'
  })

  await checkit.run(req.body)

  const user = await User.query(qb => {
    qb.where('email', req.body.email)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).json({
    message: res.t('Could not find user')
  })

  if(!user.authenticate(req.body.password)) return res.status(422).json({
    message: res.t('Password is not valid')
  })

  const token = encode(user.get('id'))

  res.status(200).json({
    data: {
      token
    }
  })

}

export default route
