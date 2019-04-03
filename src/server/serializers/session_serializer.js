import { encode } from '../utils/jwt'

const session_serializer = (user, rights) => ({
  token: encode(user.get('id')),
  user: {
    id: user.get('id'),
    full_name: user.get('full_name'),
    email: user.get('email')
  },
  rights: rights.map(right => right.get('code'))
})

export default session_serializer
