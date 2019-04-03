import UserSerializer from '../../serializers/user_serializer'
import _ from 'lodash'

const route = async (req, res) => {

  const data = _.pick(req.body, ['first_name','last_name','email','photo_id'])

  await req.user.save(data, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond(req.user, UserSerializer)

}

export default route
