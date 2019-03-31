import RoleSerializer from '../../serializers/role_serializer'
import Role from '../../models/role'

const route = async (req, res) => {

  const role = await Role.query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    transacting: req.trx
  })

  if(!role) return res.status(404).json({
    message: 'Unable to find user'
  })

  res.status(200).respond(role, RoleSerializer)

}

export default route
