import mailer from '../../queues/mailer_queue'
import { encode } from '../../lib/jwt'
import User from '../../models/user'
import Checkit from  'checkit'

const route = async (req, res) => {

  const checkit = new Checkit({
    email: 'required'
  })

  await checkit.run(req.body)

  const user = await User.query(qb => {
    qb.where('email', req.body.email)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).json({
    errors: {
      email: [res.t('Could not find user')]
    }
  })

  mailer.add({
    to: user.get('rfc822'),
    subject: 'Your password has been reset',
    template: 'reset',
    data: {
      user: {
        first_name: user.get('first_name')
      },
      token: encode(user.get('id'))
    }
  })

  res.status(200).json({
    message: res.t('Email was sent')
  })

}

export default route
