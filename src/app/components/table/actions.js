export const sort = (index) => ({
  type: 'SORT',
  index
})

export const toggle = (index) => ({
  type: 'TOGGLE',
  index
})

export const toggleAll = (rows) => ({
  type: 'TOGGLE_ALL',
  rows
})
