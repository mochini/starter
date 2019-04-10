import UserSerializer from '../../serializers/user_serializer'
import { refresh } from '../../utils/emitter'

const route = async (req, res) => {

  await req.user.save({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    photo_id: req.body.photo_id
  }, {
    patch: true,
    transacting: req.trx
  })

  await refresh([
    `/sessions/${req.user.get('id')}`,
    `/users/${req.user.get('id')}`
  ])

  res.status(200).respond(req.user, UserSerializer)

}

export default route
