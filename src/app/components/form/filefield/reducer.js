export const INITIAL_STATE = {
  status: 'pending',
  uploads: [],
  progress: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      status: 'uploading',
      uploads: [
        ...state.uploads,
        {
          ...action.upload,
          progress: 0,
          asset: null
        }

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

  case 'UPDATE_ASSET':
    return {
      ...state,
      uploads: state.uploads.map((upload, index) => {
        if(index !== action.index) return upload
        return {
          ...upload,
          asset: action.asset
        }
      })
    }

  case 'UPDATE_PROGRESS':
    return {
      ...state,
      uploads: state.uploads.map((upload, index) => {
        if(index !== action.index) return upload
        return {
          ...upload,
          progress: action.progress
        }
      })
    }

  default:
    return state

  }

}

export default reducer
