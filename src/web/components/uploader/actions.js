export const addUpload = (upload) => ({
  type: 'ADD_UPLOAD',
  upload
})

export const complete = () => ({
  type: 'COMPLETE'
})

export const reset = () => ({
  type: 'RESET'
})

export const updateUpload = (active, progress) => ({
  type: 'UPDATE_UPLOAD',
  active,
  progress
})
