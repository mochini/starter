export const begin = () => ({
  type: 'BEGIN'
})

export const cancel = () => ({
  type: 'CANCEL'
})

export const choose = (value)=> ({
  type: 'CHOOSE',
  value
})

export const clear = () => ({
  type: 'CLEAR'
})

export const next = () => ({
  type: 'NEXT'
})

export const previous = () => ({
  type: 'PREVIOUS'
})

export const setCurrent = (month, year) => ({
  type: 'SET_CURRENT',
  month,
  year
})

export const setValue = (value) => ({
  type: 'SET_VALUE',
  value
})
