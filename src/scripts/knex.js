import '../server/lib/environment'
import moment from 'moment'
import Knex from 'knex'
import path from 'path'

const dbDir = path.join('src', 'server', 'db')

const migrationDir = path.join(dbDir, 'migrations')

const fixtureDir = path.join(dbDir, 'fixtures')

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
    directory: migrationDir
  },
  pool: {
    min: 1,
    max: 1
  },
  seeds: {
    directory: fixtureDir
  },
  useNullAsDefault: true
})

const seedMake = async (label) => {

  if(!label) throw new Error('please name the seed')

  const timestamp = moment().format('YYYYMMDDHHmmss')

  const name = `${timestamp}_${label}`

  await knex.seed.make(name)

}

const migrationMake = async (label) => {

  if(!label) throw new Error('please name the migration')

  await knex.migrate.make(label)

}

const reset = async () => {

  await knex.migrate.rollback()

  await knex.migrate.latest()

  await knex.seed.run()

}

const processor = async () => {

  const args = process.argv.slice(2)

  if(args[0] === 'migrate:rollback') return await knex.migrate.rollback()

  if(args[0] === 'migrate:latest') return await knex.migrate.latest()

  if(args[0] === 'migrate:make') return await migrationMake(args[1])

  if(args[0] === 'seed:run') return await knex.seed.run()

  if(args[0] === 'seed:make') return await seedMake(args[1])

  if(args[0] === 'reset') return await reset()

  throw new Error('invalid command')

}

processor().then(process.exit)
