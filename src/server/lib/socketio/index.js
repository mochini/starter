import Redis from 'socket.io-redis'
import channels from './channels'
import socketio from 'socket.io'

const creator = (http) => {

  const io = socketio(http, { path: '/socket' })

  const redis = Redis(process.env.REDIS_URL)

  io.adapter(redis)

  io.on('connection', async (sock) => {

    await channels(io, sock)

  })

  return io

}

export default creator
