import UserSerializer from '../../serializers/user_serializer'
import User from '../../models/user'
import _ from 'lodash'

const route = async (req, res) => {

  const data = _.pick(req.body, ['first_name','last_name','email'])

  const user = await User.forge(data).save(null, {
    transacting: req.trx
  })

  if(req.body.role_ids) {

    const data = req.body.role_ids.map(role_id => ({
      user_id: user.get('id'),
      role_id
    }))

    await req.trx('roles_users').transacting(req.trx).insert(data)
  }

  res.status(200).respond(user, UserSerializer)

}

export default route
