export const INITIAL_STATE = {
  active: 0,
  status: 'pending',
  uploads: [],
  progress: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD_UPLOAD':
    return {
      ...state,
      status: 'uploading',
      uploads: [
        ...state.uploads,
        action.upload
      ]
    }

  case 'COMPLETE':
    return {
      ...state,
      status: 'complete'
    }

  case 'RESET':
    return {
      ...INITIAL_STATE
    }

  case 'UPDATE_UPLOAD':
    return {
      ...state,
      active: action.active,
      progress: action.progress
    }

  default:
    return state

  }

}

export default reducer
