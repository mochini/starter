export const reset = (email) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/signin/reset',
  body: { email },
  request: 'RESET_REQUEST',
  success: 'RESET_SUCCESS',
  failure: 'RESET_FAILURE'
})
