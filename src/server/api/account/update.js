import UserSerializer from '../../serializers/user_serializer'

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

  res.status(200).respond(req.user, UserSerializer)

}

export default route
