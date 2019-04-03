const user_serializer = (user) => ({
  id: user.get('id'),
  full_name: user.get('full_name'),
  initials: user.get('initials'),
  email: user.get('email'),
  roles: roles(user.related('roles')),
  photo: user.related('photo').get('path'),
  created_at: user.get('created_at'),
  updated_at: user.get('updated_at')
})

const roles = (roles) => {
  if(roles.length === 0) return
  return roles.map(role => ({
    title: role.get('title'),
    description: role.get('description')
  }))
}

export default user_serializer
