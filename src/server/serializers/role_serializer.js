const role_serializer = (user) => ({
  id: user.get('id'),
  title: user.get('title'),
  description: user.get('description'),
  created_at: user.get('created_at'),
  updated_at: user.get('updated_at')
})

export default role_serializer
