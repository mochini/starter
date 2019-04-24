import _ from 'lodash'

const INITIAL_STATE = {
  all: null,
  next: null,
  records: null,
  selectAll: false,
  selected: [],
  status: 'pending',
  total: null,
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: action.request.params.$page.skip === 0 ? 'loading' : 'refreshing'
    }

  case 'FETCH_SUCCESS':
    const loaded = state.records ? state.records.length : 0
    return {
      ...state,
      all: action.result.pagination.all,
      next: action.result.pagination.next,
      records: (action.result.pagination.skip > 0) ? [
        ...state.records || [],
        ...action.result.data
      ] : action.result.data,
      total: action.result.pagination.total,
      status: (loaded + action.result.data.length >= action.result.pagination.total) ? 'completed' : 'loaded'
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'FETCH_DELAY':
    return {
      ...state,
      status: 'delayed'
    }

  case 'FETCH_TIMEOUT':
    return {
      ...state,
      status: 'timeout'
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
