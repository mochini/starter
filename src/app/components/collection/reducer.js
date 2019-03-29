const INITIAL_STATE = {
  filter: { },
  q: '',
  sort: null,
  tool: null,
  layout: 'table',
  selected: [],
  sortDirection: 'desc',
  sortOrder: 'created_at'
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

  case 'QUERY':
    return {
      ...state,
      q: action.q
    }

  case 'SELECT':
    return {
      ...state,
      selected: action.selected
    }

  case 'SORT':
    return {
      ...state,
      sort: {
        column: action.column,
        order: action.order
      }
    }

  default:
    return state
  }

}

export default reducer
