const INITIAL_STATE = {
  component: null,
  location: null,
  open: false
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'OPEN':
    return {
      ...state,
      component: action.component,
      location: action.location,
      open: true
    }

  case 'CLOSE':
    return {
      ...state,
      open: false
    }

  case 'CLEAR':
    return {
      ...state,
      component: null
    }

  default:
    return state
  }

}

export default reducer
