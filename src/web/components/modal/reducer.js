const INITIAL_STATE = {
  panel: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CLOSE':
    return {
      ...state,
      panel: null
    }

  case 'OPEN':
    return {
      panel: action.component
    }


  default:
    return state
  }

}

export default reducer
