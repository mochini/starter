import './lib/environment'
import 'express-async-errors'
import withTransaction from './utils/transaction'
import multiparty from 'connect-multiparty'
import bodyParser from 'body-parser'
import express from 'express'
import api from './api'
import qs from 'qs'

const server = express()

server.set('query parser', str => qs.parse(str, { arrayLimit: 100, depth: 10 }))

server.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

server.use(bodyParser.json({ limit: '5mb' }))

server.use(multiparty({ uploadDir: './tmp' }))

server.use(withTransaction)

server.use('/api', api)

server.listen(3001, () => {
  console.log('Express listening at 3001')
})
