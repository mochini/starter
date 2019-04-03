import Right from '../../models/right'

const route = async (req, res) => {

  const rights = await Right.query(qb => {
    qb.select(req.trx.raw('distinct on (rights.id) rights.*, roles_users.role_id is not null as is_assigned'))
    qb.leftJoin('rights_roles', 'rights_roles.right_id', 'rights.id')
    qb.joinRaw('left join roles_users on roles_users.role_id=rights_roles.role_id and roles_users.user_id=?', req.user.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  const RightSerializer = (right) => ({
    id: right.get('id'),
    code: right.get('code'),
    description: 'Lorem ipsum dolor amet skateboard four dollar toast echo park viral hot chicken irony',
    is_assigned: right.get('is_assigned')
  })

  res.status(200).respond(rights, RightSerializer)

}

export default route
