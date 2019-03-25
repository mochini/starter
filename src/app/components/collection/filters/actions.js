export const reset = (key) => ({
  type: 'RESET',
  key
})

export const update = (key, value) => ({
  type: 'UPDATE',
  key,
  value
})

export const select = (index) => ({
  type: 'SELECT',
  index
})
