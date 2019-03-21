import './lib/environment'
import path from 'path'
import fs from 'fs'

const queueDir = path.join(__dirname, 'queues')

Promise.mapSeries(fs.readdirSync(queueDir), async filename => {

  const queue = require(path.join(queueDir, filename)).default

  console.log(`Starting ${queue.name}`)

  await queue.start()

})
