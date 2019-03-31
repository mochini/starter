exports.up = function(knex, Promise) {
  return knex.schema.createTable('rights', table => {
    table.increments('id').primary()
    table.string('code')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rights')
}
