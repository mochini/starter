export const clearAlert = () => ({
  type: 'CLEAR_ALERT'
})


export const connect = () => ({
  type: 'CONNECT'
})

export const disconnect = () => ({
  type: 'DISCONNECT'
})

export const joinChannel = (channel) => ({
  type: 'JOIN_CHANNEL',
  channel
})

export const leaveChannel = (channel) => ({
  type: 'LEAVE_CHANNEL',
  channel
})

export const setAlert = (status, text) => ({
  type: 'SET_ALERT',
  status,
  text
})

export const subscribe = (channel, action, handler) => ({
  type: 'SUBSCRIBE',
  channel,
  action,
  handler
})

export const unsubscribe = (channel, action, handler) => ({
  type: 'UNSUBSCRIBE',
  channel,
  action,
  handler
})
