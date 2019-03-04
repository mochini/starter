const defaults = {
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/server/db/migrations'
  },
  useNullAsDefault: true,
  client: 'pg',
  pool: {
    min: 1,
    max: 20
  }
}
module.exports = {
  development: {
    ...defaults,
    connection: 'postgres://postgres@localhost:5432/collegetourist',
    seeds: {
      directory: './src/db/fixtures'
    }
  },
  test: {
    ...defaults,
    connection: 'postgres://postgres@localhost:5432/collegetourist_test',
    seeds: {
      directory: './src/server/db/fixtures'
    }
  }
}
