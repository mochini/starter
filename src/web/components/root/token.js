import _ from 'lodash'

const ACTION_TYPES = [
  'API_REQUEST'
]

const tokenMiddleware = store => next => action => {

  const [,,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

  if(!_.includes(ACTION_TYPES, type)) return next(action)

  const presence = store.getState().presence

  if(!presence) return next(action)

  if(_.isNil(presence.user)) return next(action)

  const token = action.token || presence.token

  next({
    ...action,
    token,
    headers: {
      ...action.headers,
      'Authorization': `Bearer ${token}`
    }
  })

}

export default tokenMiddleware
