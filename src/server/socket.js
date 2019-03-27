import socket from './socket/index'
import Redis from 'socket.io-redis'
import socketio from 'socket.io'
import ping from './server/ping'
import express from 'express'
import http from 'http'

const server = express()

server.use(ping)

const transport = http.createServer(server)

const redis = Redis(process.env.REDIS_URL)

const io = socketio(transport)

io.adapter(redis)

io.on('connection', (sock) => socket(io, sock))

transport.listen(3002, () => {
  console.log('Listening on 3002')
})
