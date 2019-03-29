const INITIAL_STATE = {
  data: [],
  selected: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'RESET':
    return {
      ...state,
      data: action.key ? {
        ...state.data.filter(item => Object.keys(item)[0] !== action.key)
      } : []
    }

  case 'SELECT':
    return {
      ...state,
      selected: action.index
    }

  case 'SET':
    return {
      ...state,
      data: action.data
    }

  case 'UPDATE':
    return {
      ...state,
      data: [
        ...state.data.filter(item => Object.keys(item)[0] !== action.key),
        { [action.key]: action.value }
      ]
    }

  default:
    return state
  }

}

export default reducer
