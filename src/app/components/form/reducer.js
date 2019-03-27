const INITIAL_STATE = {
  data: {},
  entity: null,
  errors: {},
  panel: null,
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
    return {
      ...state,
      data: action.result.data
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'saved',
      entity: action.result.data
    }

  case 'SAVE_FAILURE':
    return {
      ...state,
      errors: action.result.errors,
      status: 'failure'
    }

  case 'UPDATE_DATA':
    return {
      ...state,
      data: {
        ...state.data,
        [action.key]: action.value
      }
    }

  case 'PUSH':
    return {
      ...state,
      panel: action.component
    }

  case 'POP':
    return {
      ...state,
      panel: null
    }

  default:
    return state
  }

}
