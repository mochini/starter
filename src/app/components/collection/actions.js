export const changeLayout = (layout) => ({
  type: 'CHANGE_LAYOUT',
  layout
})

export const changeTool = (tool) => ({
  type: 'CHANGE_TOOL',
  tool
})

export const filter = (filter) => ({
  type: 'FILTER',
  filter
})

export const select = (selected) => ({
  type: 'SELECT',
  selected
})

export const sort = (column, order) => ({
  type: 'SORT',
  column,
  order
})
