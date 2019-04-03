import SessionSerializer from '../../serializers/session_serializer'
import Right from '../../models/right'

const route = async (req, res) => {

  if(!req.user) return res.status(404).json({
    message: res.t('You are not signedin')
  })

  const rights = await Right.query(qb => {
    qb.select(req.trx.raw('distinct on (rights.id) rights.*'))
    qb.innerJoin('rights_roles', 'rights_roles.right_id', 'rights.id')
    qb.innerJoin('roles_users', 'roles_users.role_id', 'rights_roles.role_id')
    qb.where('roles_users.user_id', req.user.get('id'))
  }).fetchAll({
    transacting: req.trx
  })

  res.status(200).json({
    data: SessionSerializer(req.user, rights)
  })

}

export default route
