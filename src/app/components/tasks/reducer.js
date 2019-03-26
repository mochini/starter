const INITIAL_STATE = {
  items: null,
  open: false
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'OPEN':
    return {
      ...state,
      items: action.items,
      open: true
    }

  case 'CLOSE':
    return {
      ...state,
      open: false
    }

  case 'CLEAR':
    return {
      items: null,
      open: false
    }

  default:
    return state
  }

}

export default reducer
