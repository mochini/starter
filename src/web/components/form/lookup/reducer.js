const INITIAL_STATE = {
  active: false,
  selected: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'BEGIN':
    return {
      ...state,
      active: true
    }

  case 'CANCEL':
    return {
      ...state,
      active: false
    }

  case 'CLEAR':
    return {
      ...state,
      selected: []
    }

  case 'SET':
    return {
      ...state,
      selected: action.selected
    }

  default:
    return state
  }

}

export default reducer
