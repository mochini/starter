import { Router } from 'express'
import notFound from './default/not_found'
import token from './default/token'
import error from './default/error'
import session from './session'
import assets from './assets'
import signin from './signin'
import rights from './rights'
import roles from './roles'
import users from './users'

const router = new Router({ mergeParams: true })

router.use('/signin', signin)

router.use(token)

router.use('/assets', assets)

router.use('/session', session)

router.use('/roles', roles)

router.use('/rights', rights)

router.use('/users', users)

router.use(notFound)

router.use(error)

export default router
