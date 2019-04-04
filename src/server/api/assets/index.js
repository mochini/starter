import { Router } from 'express'
import upload from './upload'
import test from './test'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/', show)

router.get('/upload', test)

router.post('/upload', upload)

export default router
