import socketio from './lib/socketio'
import express from './lib/express'
import http from 'http'

const server = express()

const transport = http.Server(server)

socketio(transport)

transport.listen(3001, () => {
  console.log('Listening at 3001')
})
