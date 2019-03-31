exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.text('description')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles')
}
