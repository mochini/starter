export const query = (q) => ({
  type: 'QUERY',
  q
})

export const set = (selected) => ({
  type: 'SET',
  selected
})

export const toggle = (index) => ({
  type: 'TOGGLE',
  index
})
