import moment from 'moment'

exports.seed = async (knex, Promise) => {

  await knex('roles').del()

  await knex('roles').insert([
    {
      title: 'Administrator',
      description: 'Can access everything',
      created_at: moment(),
      updated_at: moment()
    }, {
      title: 'Employee',
      description: 'Can access some things',
      created_at: moment(),
      updated_at: moment()
    }
  ])

}
