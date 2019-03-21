export const addUpload = (upload) => ({
  type: 'ADD_UPLOAD',
  upload
})

export const complete = () => ({
  type: 'COMPLETE'
})

export const saveUpload = (uniqueIdentifier, tour_id, visit_id, asset_id) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: `/api/tours/${tour_id}/visits/${visit_id}/photos`,
  meta: { uniqueIdentifier },
  body: { asset_id },
  request: 'SAVE_REQUEST',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const reset = () => ({
  type: 'RESET'
})

export const updateUpload = (active, progress) => ({
  type: 'UPDATE_UPLOAD',
  active,
  progress
})
