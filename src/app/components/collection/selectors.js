import { createSelector } from 'reselect'

const table = (state, props) => props.table

const list = (state, props) => props.list

const tile = (state, props) => props.tile

export const layouts = createSelector(
  table, list, tile,
  (table, list, tile) => {
    const layouts = []
    if(table) layouts.push({ key: 'table', icon: 'table' })
    if(list) layouts.push({ key: 'list', icon: 'list' })
    if(tile) layouts.push({ key: 'tile', icon: 'th' })
    // if(map) layouts.push({ key: 'map', icon: 'map-marker' })
    return layouts
  }
)
