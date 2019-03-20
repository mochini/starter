import { Router } from 'express'
import notFound from './default/not_found'
import token from './default/token'
import error from './default/error'
import session from './session'
import signin from './signin'

const router = new Router({ mergeParams: true })

router.use('/signin', signin)

router.use(token)

router.use('/session', session)

router.use(notFound)

router.use(error)

export default router
