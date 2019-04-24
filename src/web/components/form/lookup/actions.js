export const begin = () => ({
  type: 'BEGIN'
})

export const cancel = () => ({
  type: 'CANCEL'
})

export const clear = () => ({
  type: 'CLEAR'
})

export const set = (selected) => ({
  type: 'SET',
  selected
})
