import UserSerializer from '../../serializers/user_serializer'
import User from '../../models/user'

const route = async (req, res) => {

  const users = await User.query(qb => {
    qb.leftJoin('roles_users','users.id','roles_users.user_id')
  }).filter({
    filter: req.query.$filter,
    searchParams: ['first_name','last_name','email']
  }).sort({
    sort: req.query.$sort
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(users, UserSerializer)

}

export default route
