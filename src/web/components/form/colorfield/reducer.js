const INITIAL_STATE = {
  color: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      color: action.color
    }

  default:
    return state
  }

}

export default reducer
