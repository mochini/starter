import User from '../../models/user'

const filtersort = (qb, filter) => {
  const term = `%${filter.q.toLowerCase()}%`
  if(filter.q) qb.whereRaw('LOWER(first_name) LIKE ? or LOWER(last_name) LIKE ?', [term, term])
}

const route = async (req, res) => {
  const users = await User.query(qb => {
    if(qb, req.query.$filter) filtersort(qb, req.query.$filter)
  }).fetchAll({
    transacting: req.trx
  })
  res.status(200).json({
    data: users.map((user, index) => ({
      id: user.get('id'),
      full_name: user.get('full_name'),
      email: user.get('email')
    })),
    pagination: {
      all: 500,
      total: 500,
      limit: 100,
      skip: req.query.$page.skip
    }
  })
}

export default route
