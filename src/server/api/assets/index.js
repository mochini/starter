import { Router } from 'express'
import upload from './upload'
import check from './check'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/', show)

router.get('/upload', check)

router.post('/upload', upload)

export default router
