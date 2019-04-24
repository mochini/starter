export const INITIAL_STATE = {
  message: null,
  errors: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'RESET_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'RESET_SUCCESS':
    return {
      ...state,
      message: action.result.message,
      status: 'success'
    }

  case 'RESET_FAILURE':
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
