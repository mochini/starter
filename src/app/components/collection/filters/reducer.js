import _ from 'lodash'

const INITIAL_STATE = {
  data: {},
  selected: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'RESET':
    return {
      ...state,
      data: action.key ? {
        ..._.without(state.data, action.key)
      } : {}
    }

  case 'SELECT':
    return {
      ...state,
      selected: action.index
    }

  case 'UPDATE':
    return {
      ...state,
      data: {
        ...state.data,
        [action.key]: action.value
      }
    }

  default:
    return state
  }

}

export default reducer
