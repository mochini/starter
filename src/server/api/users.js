import { Router } from 'express'
import User from '../models/user'

const router = new Router({ mergeParams: true })

router.get('/', async (req, res) => {
  const users = await User.fetchAll({
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
})

router.get('/:id', async (req, res) => {
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
})

export default router
