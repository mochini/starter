import { Router } from 'express'
import create from './create'
import reset from './reset'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.post('/reset', reset)

export default router
