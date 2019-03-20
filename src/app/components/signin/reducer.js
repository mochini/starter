export const INITIAL_STATE = {
  errors: null,
  status: 'pending',
  token: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SIGNIN_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'SIGNIN_SUCCESS':
    return {
      ...state,
      token: action.result.data.token,
      status: 'success'
    }

  case 'SIGNIN_FAILURE':
    return {
      ...state,
      errors: action.result.errors,
      status: 'failure'
    }

  default:
    return state
  }

}

export default reducer
