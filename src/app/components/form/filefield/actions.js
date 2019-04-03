export const add = (upload) => ({
  type: 'ADD',
  upload
})

export const complete = () => ({
  type: 'COMPLETE'
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
