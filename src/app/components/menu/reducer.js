const INITIAL_STATE = {
  path: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FORWARD':
    return {
      ...state,
      path: [
        ...state.path,
        action.index
      ]
    }

  case 'BACK':
    return {
      ...state,
      path: [
        ...state.path.slice(0, -1)
      ]
    }

  default:
    return state
  }

}

export default reducer
