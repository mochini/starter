import RoleSerializer from '../../serializers/role_serializer'
import Role from '../../models/role'

const route = async (req, res) => {

  const roles = await Role.filter({
    filter: req.query.$filter,
    searchParams: ['title']
  }).sort({
    sort: req.query.$sort
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(roles, RoleSerializer)

}

export default route
