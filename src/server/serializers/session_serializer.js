import { encode } from '../utils/jwt'

const session_serializer = (user, rights) => ({
  token: encode(user.get('id')),
  user: {
    id: user.get('id'),
    full_name: user.get('full_name'),
    initials: user.get('initials'),
    email: user.get('email'),
    photo: user.related('photo').get('path')
  },
  rights: rights.map(right => right.get('code'))
})

export default session_serializer
