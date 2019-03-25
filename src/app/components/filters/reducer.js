const INITIAL_STATE = {
  data: {},
  selected: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'UPDATE':
    return {
      ...state,
      data: {
        ...state.data,
        [action.key]: action.value
      }
    }

  case 'SELECT':
    return {
      ...state,
      selected: action.index
    }

  default:
    return state
  }

}

export default reducer
