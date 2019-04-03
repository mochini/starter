import RoleSerializer from '../../serializers/role_serializer'
import Role from '../../models/role'
import _ from 'lodash'

const route = async (req, res) => {

  const data = _.pick(req.body, ['first_name','last_name','email'])

  const role = await Role.forge(data).save(null, {
    transacting: req.trx
  })

  if(req.body.right_ids) {

    const data = req.body.right_ids.map(right_id => ({
      role_id: role.get('id'),
      right_id
    }))

    await req.trx('rights_roles').transacting(req.trx).insert(data)

  }

  res.status(200).respond(role, RoleSerializer)

}

export default route
