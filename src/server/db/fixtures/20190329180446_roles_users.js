exports.seed = async (knex, Promise) => {

  await knex('roles_users').del()

  await knex('roles_users').insert([
    {
      user_id: 1,
      role_id: 1
    },
    ...Array(100).fill().map((n, index) => ({
      user_id: index + 1,
      role_id: 2
    }))
  ])

}
