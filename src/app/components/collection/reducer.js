const INITIAL_STATE = {
  layout: 'table'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_LAYOUT':
    return {
      ...state,
      layout: action.layout
    }

  default:
    return state
  }

}

export default reducer
