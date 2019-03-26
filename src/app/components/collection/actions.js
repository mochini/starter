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

export const query = (q) => ({
  type: 'QUERY',
  q
})

export const toggle = (index) => ({
  type: 'TOGGLE',
  index
})

export const toggleAll = (rows) => ({
  type: 'TOGGLE_ALL',
  rows
})
