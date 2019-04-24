export const signin = (email, password) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint: '/api/signin',
  body: { email, password },
  request: 'SIGNIN_REQUEST',
  success: 'SIGNIN_SUCCESS',
  failure: 'SIGNIN_FAILURE'
})
