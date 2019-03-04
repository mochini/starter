import Knex from 'knex'

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  useNullAsDefault: true,
  pool: {
    min: 3,
    max: 5
  }
})

export default knex
