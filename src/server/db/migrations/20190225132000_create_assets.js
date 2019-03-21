exports.up = function(knex, Promise) {
  return knex.schema.createTable('assets', table => {
    table.increments('id').primary()
    table.string('original_file_name')
    table.string('file_name')
    table.string('content_type')
    table.integer('file_size')
    table.integer('chunks_total')
    table.string('status')
    table.integer('width')
    table.integer('height')
    table.timestamps()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('assets')
}
