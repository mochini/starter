const INITIAL_STATE = {
  data: {},
  entity: null,
  errors: {},
  panel: null,
  ready: [],
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'loaded',
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

  case 'SET_DATA':
    return {
      ...state,
      status: 'loaded',
      data: action.data
    }

  case 'SET_READY':
    return {
      ...state,
      ready: [
        ...state.ready,
        action.field
      ]
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
