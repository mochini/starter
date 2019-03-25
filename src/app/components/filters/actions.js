export const change = (key, value) => ({
  type: 'CHANGE',
  key,
  value
})

export const select = (index) => ({
  type: 'SELECT',
  index
})
