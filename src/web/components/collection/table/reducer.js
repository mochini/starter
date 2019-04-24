const INITIAL_STATE = {
  sortColumn: 0,
  sortOrder: 'asc'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SORT_COLUMN':
    return {
      ...state,
      sortColumn: action.index,
      sortOrder: state.sortColumn === action.index && state.sortOrder == 'asc' ? 'desc' : 'asc'
    }

  default:
    return state
  }

}

export default reducer
