import { Router } from 'express'
import update from './update'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.get('/edit', edit)

router.patch('/', update)

export default router
