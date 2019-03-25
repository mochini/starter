const INITIAL_STATE = {
  filter: {},
  tool: null,
  layout: 'table'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_LAYOUT':
    return {
      ...state,
      layout: action.layout
    }

  case 'CHANGE_TOOL':
    return {
      ...state,
      tool: action.tool === state.tool ? null : action.tool
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
