import User from '../../models/user'

const route = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).json({
    message: 'Unable to find user'
  })

  res.status(200).respond(user, (user) => ({
    first_name: user.get('first_name'),
    last_name: user.get('last_name'),
    email: user.get('email')
  }))

}

export default route
