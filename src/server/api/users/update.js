import UserSerializer from '../../serializers/user_serializer'
import User from '../../models/user'
import _ from 'lodash'

const route = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).json({
    message: 'Unable to find user'
  })

  const data = _.pick(req.body, ['first_name','last_name','email'])

  await user.save(data, {
    patch: true,
    transacting: req.trx
  })

  res.status(200).respond(user, UserSerializer)

}

export default route
