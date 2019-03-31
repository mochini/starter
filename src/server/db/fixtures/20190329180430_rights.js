exports.seed = async (knex, Promise) => {

  await knex('rights').del()

  await knex('rights').insert([
    {
      code: 'can_manage_users'
    }, {
      code: 'can_manage_roles'
    }
  ])

}
