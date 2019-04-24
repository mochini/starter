const INITIAL_STATE = {
  online: null,
  channels: [],
  listeners: [],
  status: null,
  text: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CLEAR_ALERT':
    return {
      ...state,
      status: null,
      text: null
    }

  case 'CONNECT':
    return {
      ...state,
      online: true
    }

  case 'DISCONNECT':
    return {
      ...state,
      online: false
    }

  case 'JOIN_CHANNEL':
    return {
      ...state,
      channels: [
        ...state.channels,
        action.channel
      ]
    }

  case 'LEAVE_CHANNEL':
    return {
      ...state,
      channels: [
        ...state.channels.filter(channel => {
          return channel !== action.channel
        })
      ]
    }

  case 'SUBSCRIBE':
    return {
      ...state,
      listeners: [
        ...state.listeners,
        {
          channel: action.channel,
          action: action.action,
          handler: action.handler
        }
      ]
    }

  case 'UNSUBSCRIBE':
    return {
      ...state,
      listeners: [
        ...state.listeners.filter(listener => {
          return listener.channel !== action.channel || listener.action !== action.action || listener.handler !== action.handler
        })
      ]
    }

  case 'SET_ALERT':
    return {
      ...state,
      status: action.status,
      text: action.text
    }

  default:
    return state
  }

}

export default reducer
