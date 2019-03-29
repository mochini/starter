const user_serializer = (user) => ({
  id: user.get('id'),
  full_name: user.get('full_name'),
  email: user.get('email'),
  created_at: user.get('created_at'),
  updated_at: user.get('updated_at')
})

export default user_serializer
