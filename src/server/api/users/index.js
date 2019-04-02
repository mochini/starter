import { Router } from 'express'
import list from './list'
import show from './show'
import edit from './edit'
import update from './update'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

export default router
