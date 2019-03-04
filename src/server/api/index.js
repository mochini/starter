import { Router } from 'express'
import notFound from './default/not_found'
import error from './default/error'

const router = new Router({ mergeParams: true })

router.use(notFound)

router.use(error)

export default router
