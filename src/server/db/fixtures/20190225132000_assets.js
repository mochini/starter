const moment = require('moment')

exports.seed = async (knex, Promise) => {

  await knex('assets').del()

  await knex('assets').insert([
    {
      original_file_name: 'john.jpg',
      file_name: 'john.jpg',
      content_type: 'image/jpeg',
      file_size: 1024,
      chunks_total: 1,
      status: 'assembled',
      width: 100,
      height: 100,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
