exports.seed = async (knex, Promise) => {

  await knex('rights_roles').del()

  await knex('rights_roles').insert([
    {
      role_id: 1,
      right_id: 1
    }, {
      role_id: 1,
      right_id: 2
    }
  ])

}
