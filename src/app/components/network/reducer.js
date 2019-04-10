const INITIAL_STATE = {
  online: null,
  channels: {},
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
