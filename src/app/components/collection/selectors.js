import { createSelector } from 'reselect'

const table = (state, props) => props.table

const layouts = (state, props) => props.layouts || []

const list = (state, props) => props.list

const tile = (state, props) => props.tile

export const allLayouts = createSelector(
  table, layouts, list, tile,
  (table, layouts, list, tile) => {
    const allLayouts = []
    if(table) allLayouts.push({ key: 'table', icon: 'table' })
    if(list) allLayouts.push({ key: 'list', icon: 'list' })
    if(tile) allLayouts.push({ key: 'tile', icon: 'th' })
    return [
      ...allLayouts,
      ...layouts
    ]
  }
)
