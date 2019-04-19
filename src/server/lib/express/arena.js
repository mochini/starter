import Arena from 'bull-arena'
import path from 'path'
import fs from 'fs'

const queueDir = path.join(__dirname, '..', '..', 'queues')

const arena = Arena({
  queues: fs.readdirSync(queueDir).map(filename => ({
    name: filename.replace('_queue.js', ''),
    hostId: 'worker',
    redis: process.env.REDIS_URL
  }))
}, {
  basePath: '/jobs',
  disableListen: true
})

export default arena
