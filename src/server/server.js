import './lib/environment'
import withTransaction from './server/transaction'
import imagecache from './server/imagecache'
import multiparty from 'connect-multiparty'
import bodyParser from 'body-parser'
import logger from './server/logger'
import format from './server/format'
import socket from './socket/index'
import Redis from 'socket.io-redis'
import express from './lib/express'
import { Server } from 'http'
import arena from './server/arena'
import socketio from 'socket.io'
import ping from './server/ping'
import i18n from './lib/i18n'
import path from 'path'
import api from './api'
import qs from 'qs'

const redis = Redis(process.env.REDIS_URL)

const server = express()

const http = Server(server)

const io = socketio(http, { path: '/socket' })

io.adapter(redis)

io.on('connection', (sock) => socket(io, sock))

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use(multiparty({ uploadDir: './tmp' }))

server.use(i18n.init)

server.use(express.static(path.join(__dirname, '..', 'app', 'public')))

server.use('/locales', express.static(path.join(__dirname, '..', 'locales')))

server.use(withTransaction)

if(process.env.NODE_ENV !== 'production') server.use(logger)

server.use('/imagecache', imagecache)

server.use('/ping', ping)

server.use(arena)

server.use(format)

server.use('/api', api)

http.listen(3001, () => {
  console.log('Listening at 3001')
})
