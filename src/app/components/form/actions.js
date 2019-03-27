export const fetch = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  request: 'FETCH_SAVE',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const pop = () => ({
  type: 'POP'
})

export const push = (component) => ({
  type: 'PUSH',
  component
})

export const save = (method, endpoint, body) => ({
  type: 'API_REQUEST',
  method,
  endpoint,
  body,
  request: 'SAVE_SAVE',
  success: 'SAVE_SUCCESS',
  failure: 'SAVE_FAILURE'
})

export const updateData = (key, value) => ({
  type: 'UPDATE_DATA',
  key,
  value
})
