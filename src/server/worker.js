import './lib/environment'
import path from 'path'
import fs from 'fs'

const queueDir = path.join(__dirname, 'queues')

const queueFiles = fs.readdirSync(queueDir).filter(file => file.match(/^\./) === null)

Promise.mapSeries(queueFiles, async (filename) => {

  const queue = require(path.join(queueDir, filename)).default

  console.log(`Starting queue ${queue.name}`)

  await queue.start()

})
