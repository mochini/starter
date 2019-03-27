import _ from 'lodash'

const INITIAL_STATE = {
  records: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: (status !== 'pending' && action.request.params.$page.skip === 0) ? 'loading' : 'refreshing'
    }

  case 'FETCH_SUCCESS':
    if(!_.includes(['loading','refreshing','delayed'], state.status)) return state
    const loaded = state.records ? state.records.length : 0
    if(action.result.pagination.all !== undefined) {
      return {
        ...state,
        all: action.result.pagination.all,
        records: (action.result.pagination.skip > 0) ? [
          ...state.records || [],
          ...action.result.data
        ] : action.result.data,
        total: action.result.pagination.total,
        status: (loaded + action.result.data.length >= action.result.pagination.total) ? 'completed' : 'loaded'
      }
    } else if(action.result.pagination.next !== undefined) {
      return {
        ...state,
        next: action.result.pagination.next,
        records: (action.result.pagination.skip > 0) ? [
          ...state.records || [],
          ...action.result.data
        ] : action.result.data,
        status: action.result.pagination.next === null ? 'completed' : 'loaded'
      }
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

  default:
    return state
  }

}

export default reducer
