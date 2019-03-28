import User from '../../models/user'

const route = async (req, res) => {
  const user = await User.query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    transacting: req.trx
  })
  res.status(200).json({
    data: {
      id: user.get('id'),
      full_name: user.get('full_name'),
      email: user.get('email')
    }
  })
}

export default route
