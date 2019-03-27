import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import dotenv from 'dotenv'
import Mocha from 'mocha'
import Redis from 'ioredis'
import glob from 'glob'
import Knex from 'knex'
import fs from 'fs'

if(!process.env.DATABASE_URL) {

  if(!fs.existsSync('.env.test')) {
    console.log('Could not find .env.test')
    process.exit()
  }

  dotenv.load({ path: '.env.test' })

}

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/server/db/migrations'
  },
  pool: {
    min: 1,
    max: 1
  },
  seeds: {
    directory: './src/server/db/fixtures'
  },
  useNullAsDefault: true
})

const redis = new Redis(process.env.REDIS_URL)

Enzyme.configure({ adapter: new Adapter() })

const test = async () => {

  const args = process.argv.slice(2)

  const mocha = new Mocha()

  if(fs.existsSync(args[0]) && fs.statSync(args[0]).isFile()) {

    mocha.addFile(args[0])

  } else {

    const root = args[0] || 'src/@(app|server)'

    glob.sync(`${root}/**/*test.js`).map((test) => {
      mocha.addFile(test)
    })

  }

  mocha.suite.beforeAll('migrate and seed', async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  mocha.suite.beforeEach('begin transaction', async () => {
    await redis.flushall()
    global.knex = await new Promise((resolve, reject) => {
      knex.transaction(tx => {
        resolve(tx)
      }).catch(() => {})
    })
  })

  mocha.suite.afterEach('rollback transaction', async () => {
    await redis.flushall()
    global.knex.rollback().catch(() => {})
  })

  mocha.suite.afterAll('rollback database', async () => {
    await knex.migrate.rollback()
  })

  await new Promise((resolve, reject) => mocha.run(resolve))

}

test().then(process.exit)
