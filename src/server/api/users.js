import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
  res.status(200).json({
    data: {
      id: 1,
      full_name: 'Greg Kops 1',
      email: 'mochini+1@gmail.com'
    }
  })
})

export default router
