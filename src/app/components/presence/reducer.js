const INITIAL_STATE = {
  status: 'pending',
  token: null,
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_TOKEN_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOAD_TOKEN_SUCCESS':
    return {
      ...state,
      token: action.value,
      status: 'loaded'
    }

  case 'LOAD_TOKEN_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'LOAD_SESSION_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'LOAD_SESSION_SUCCESS':
    return {
      ...state,
      ...action.result.data,
      status: 'saved'
    }

  case 'LOAD_SESSION_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'SET_TOKEN':
    return {
      ...state,
      token: action.token,
      status: 'loaded'
    }

  case 'SIGNOUT':
    return {
      ...state,
      status: 'loaded',
      token: null,
      user: null
    }

  default:
    return state
  }

}
