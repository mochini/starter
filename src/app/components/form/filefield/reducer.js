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
      uploads: [
        ...state.uploads,
        {
          status: 'uploading',
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

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'loaded',
      uploads: action.result.data.map(asset => ({
        asset
      }))
    }

  case 'REMOVE':
    return {
      uploads: [
        ...state.uploads.filter((upload, index) => index !== action.index)
      ]
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
          status: 'uploaded',
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
