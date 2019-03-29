import UserSerializer from '../../serializers/user_serializer'
import User from '../../models/user'

const route = async (req, res) => {

  const users = await User.filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(users, UserSerializer)

}

export default route
