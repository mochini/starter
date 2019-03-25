import _ from 'lodash'

const INITIAL_STATE = {
  selected: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      selected: action.selected
    }

  case 'TOGGLE':
    return {
      ...state,
      selected: [
        ..._.xor(state.selected, [action.index])
      ]
    }

  default:
    return state
  }

}

export default reducer
