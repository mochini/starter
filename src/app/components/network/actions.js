export const clearAlert = () => ({
  type: 'CLEAR_ALERT'
})


export const connect = () => ({
  type: 'CONNECT'
})

export const disconnect = () => ({
  type: 'DISCONNECT'
})

export const setAlert = (status, text) => ({
  type: 'SET_ALERT',
  status,
  text
})
