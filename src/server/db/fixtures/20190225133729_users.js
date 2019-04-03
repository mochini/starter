import bcrypt from 'bcrypt-nodejs'
import moment from 'moment'
import faker from 'faker'


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
      created_at: moment(),
      updated_at: moment()
    },
    ...Array(100).fill().map(n => {
      const first_name = faker.name.firstName()
      const last_name = faker.name.lastName()
      const email = `${first_name}.${last_name}@gmail.com`.toLowerCase()
      return {
        first_name,
        last_name,
        email,
        password_salt,
        password_hash: bcrypt.hashSync('test', password_salt),
        created_at: moment(),
        updated_at: moment()
      }
    })
  ])

}
