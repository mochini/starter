const INITIAL_STATE = {
  selected: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      selected: action.selected
    }

  case 'TOGGLE':
    return {
      ...state,
      selected: action.value === state.selected ? null : action.value
    }

  default:
    return state
  }

}

export default reducer
