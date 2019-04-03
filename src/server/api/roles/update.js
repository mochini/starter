import RoleSerializer from '../../serializers/role_serializer'
import Role from '../../models/role'
import _ from 'lodash'

const route = async (req, res) => {

  const role = await Role.query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    transacting: req.trx
  })

  if(!role) return res.status(404).json({
    message: 'Unable to find role'
  })

  const data = _.pick(req.body, ['title','description'])

  await role.save(data, {
    patch: true,
    transacting: req.trx
  })

  if(req.body.right_ids) {

    await req.trx('rights_roles').transacting(req.trx).where({
      role_id: role.get('id')
    }).del()

    const data = req.body.right_ids.map(right_id => ({
      role_id: role.get('id'),
      right_id
    }))

    await req.trx('rights_roles').transacting(req.trx).insert(data)
  }

  res.status(200).respond(role, RoleSerializer)

}

export default route
