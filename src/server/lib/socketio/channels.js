import * as jwt from '../../utils/jwt'
import User from '../../models/user'
import _ from 'lodash'

const authenticate = async (token) => {

  if(!token) throw new Error('no token provided')

  const tokenData = jwt.decode(token)

  if(!tokenData.user_id) throw new Error('invalid token')

  const user = await User.where({
    id: tokenData.user_id
  }).fetch()

  if(!user) throw new Error('invalid user')

  return user

}

const channels = async (io, socket) => {

  socket.on('join', async (token, channels, callback) => {

    const authenticated = await authenticate(token)

    if(!authenticated) return

    await Promise.map(_.castArray(channels), async channel => {
      socket.join(channel)
      callback(channel)
    })

  })

  socket.on('leave', async (token, channels, callback) => {

    const authenticated = await authenticate(token)

    if(!authenticated) return

    await Promise.map(_.castArray(channels), async channel => {
      socket.leave(channel)
      callback(channel)
    })

  })

}

export default channels
