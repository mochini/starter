export const reset = (key) => ({
  type: 'RESET',
  key
})

export const select = (index) => ({
  type: 'SELECT',
  index
})

export const set = (data) => ({
  type: 'SET',
  data
})

export const update = (key, value) => ({
  type: 'UPDATE',
  key,
  value
})
