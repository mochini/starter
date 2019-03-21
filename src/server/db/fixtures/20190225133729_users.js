import bcrypt from 'bcrypt-nodejs'
const moment = require('moment')

exports.seed = async (knex, Promise) => {

  const password_salt = bcrypt.genSaltSync(10)

  await knex('users').del()

  await knex('users').insert([
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@gmail.com',
      password_salt,
      password_hash: bcrypt.hashSync('test', password_salt),
      photo_id: 1,
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
