import UserSerializer from '../../serializers/user_serializer'
import User from '../../models/user'

const route = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['roles'],
    transacting: req.trx
  })

  if(!user) return res.status(404).json({
    message: 'Unable to find user'
  })

  res.status(200).respond(user, UserSerializer)

}

export default route
