import { Router } from 'express'
import update from './update'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/upload', show)

router.post('/upload', update)

export default router
