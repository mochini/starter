import _ from 'lodash'

const INITIAL_STATE = {
  filter: { },
  q: '',
  sort: null,
  tool: null,
  layout: 'table',
  selectAll: false,
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

  case 'SORT':
    return {
      ...state,
      sort: {
        column: action.column,
        order: action.order
      }
    }

  case 'TOGGLE':
    return {
      ...state,
      selectAll: false,
      selected: [
        ..._.xor(state.selected, [action.index])
      ]
    }

  case 'TOGGLE_ALL':
    return {
      ...state,
      selectAll: !state.selectAll,
      selected: !state.selectAll ? Array(action.rows).fill().map((n, index) => index) : []
    }

  default:
    return state
  }

}

export default reducer
