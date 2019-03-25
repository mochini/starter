const INITIAL_STATE = {
  data: {}
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE':
    return {
      ...state,
      data: {
        ...state.data,
        [action.key]: action.value
      }
    }

  default:
    return state
  }

}

export default reducer
