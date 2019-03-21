import knex from '../lib/knex'
import Redis from 'ioredis'
import Bull from 'bull'

const clients = {}

const createClient = (type) => {
  if(clients[type]) return clients[type]
  clients[type] = new Redis(process.env.REDIS_URL)
  return clients[type]
}

class Queue {

  constructor(options) {
    this._add = options.add
    this.name = options.name
    this.process = options.process
    this.failed = options.failed
    this.completed = options.completed
    this.queue = new Bull(this.name, { createClient })
  }

  async start() {
    this.queue.process((job) => knex.transaction(async (trx) => {
      job.trx = trx
      try {
        await this.process(job)
        job.progress(100)
        return trx.commit()
      } catch(e) {
        trx.rollback(e)
      }
    }))
    if(this.failed) this.queue.on('failed', this.failed)
    if(this.completed) this.queue.on('completed', this.completed)
  }

  async add(job) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.queue.add(job, { delay: 2000, attempts: 3, backoff: 5000 })
        resolve()
      }, 500)
    })
  }

}

export default Queue
