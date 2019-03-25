const INITIAL_STATE = {
  filtering: true
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TOGGLE_FILTER':
    return {
      ...state,
      filtering: !state.filtering
    }

  default:
    return state
  }

}

export default reducer
