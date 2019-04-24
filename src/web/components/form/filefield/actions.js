export const fetch = (query) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/assets',
  query,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const add = (upload) => ({
  type: 'ADD',
  upload
})

export const complete = () => ({
  type: 'COMPLETE'
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})

export const reset = () => ({
  type: 'RESET'
})

export const updateAsset = (index, asset) => ({
  type: 'UPDATE_ASSET',
  index,
  asset
})

export const updateProgress = (index, progress) => ({
  type: 'UPDATE_PROGRESS',
  index,
  progress
})
