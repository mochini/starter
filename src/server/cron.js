import './lib/environment'
import later from 'later'
import path from 'path'
import fs from 'fs'

const cronDir = path.join(__dirname, 'cron')

const cronFiles = fs.readdirSync(cronDir).filter(file => file.match(/^\./) === null)

Promise.mapSeries(cronFiles, async (filename) => {

  const cron = require(path.join(cronDir, filename)).default

  console.log(`Starting cronjob ${cron.name}`)

  const schedule = later.parse.cron(cron.schedule, true)

  later.setInterval(cron.process, schedule)

})
