import RightSerializer from '../../serializers/right_serializer'
import Right from '../../models/right'

const route = async (req, res) => {

  const roles = await Right.filter({
    filter: req.query.$filter,
    searchParams: ['code']
  }).sort({
    sort: req.query.$sort
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(roles, RightSerializer)

}

export default route
