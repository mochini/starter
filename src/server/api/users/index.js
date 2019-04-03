import { Router } from 'express'
import update from './update'
import rights from './rights'
import list from './list'
import show from './show'
import edit from './edit'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/rights', rights)

router.patch('/:id', update)

export default router
