const INITIAL_STATE = {
  filter: {},
  layout: 'table'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_LAYOUT':
    return {
      ...state,
      layout: action.layout
    }

  case 'FILTER':
    return {
      ...state,
      filter: action.filter
    }

  default:
    return state
  }

}

export default reducer
