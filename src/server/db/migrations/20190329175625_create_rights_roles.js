exports.up = function(knex, Promise) {
  return knex.schema.createTable('rights_roles', table => {
    table.integer('right_id').unsigned()
    table.foreign('right_id').references('rights.id')
    table.integer('role_id').unsigned()
    table.foreign('role_id').references('roles.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rights_roles')
}
