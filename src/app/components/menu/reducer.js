const INITIAL_STATE = {
  classNames: 'next',
  path: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FORWARD':
    return {
      ...state,
      classNames: 'next',
      path: [
        ...state.path,
        action.index
      ]
    }

  case 'BACK':
    return {
      ...state,
      classNames: 'back',
      path: [
        ...state.path.slice(0, -1)
      ]
    }

  default:
    return state
  }

}

export default reducer
