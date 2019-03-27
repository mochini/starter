import { Router } from 'express'
import notFound from './default/not_found'
import token from './default/token'
import error from './default/error'
import session from './session'
import assets from './assets'
import signin from './signin'

const router = new Router({ mergeParams: true })

router.use('/signin', signin)

router.use(token)

router.use('/assets', assets)

router.use('/session', session)

router.get('/users', (req, res) => {
  const base = parseInt(req.query.$page.skip)
  res.status(200).json({
    data: Array(100).fill().map((n, index) => ({
      id: base + index + 1,
      full_name: `Greg Kops ${base + index}`,
      email: `mochini+${base + index}@gmail.com`
    })),
    pagination: {
      all: 500,
      total: 500,
      limit: 100,
      skip: req.query.$page.skip
    }
  })
})

router.use(notFound)

router.use(error)

export default router
