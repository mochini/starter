import _ from 'lodash'

const INITIAL_STATE = {
  selectAll: false,
  selected: [],
  sortColumn: 0,
  sortOrder: 'asc'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SORT':
    return {
      ...state,
      sortColumn: action.index,
      sortOrder: state.sortColumn === action.index && state.sortOrder == 'asc' ? 'desc' : 'asc'
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
