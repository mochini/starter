import './lib/environment'
import 'express-async-errors'
import withTransaction from './server/transaction'
import imagecache from './server/imagecache'
import multiparty from 'connect-multiparty'
import bodyParser from 'body-parser'
import logger from './server/logger'
import arena from './server/arena'
import ping from './server/ping'
import i18n from './server/i18n'
import express from 'express'
import path from 'path'
import api from './api'
import qs from 'qs'

const server = express()

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

server.use('/api', api)

server.listen(3001, () => {
  console.log('Listening at 3001')
})
