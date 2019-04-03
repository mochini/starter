const role_serializer = (user) => ({
  id: user.get('id'),
  code: user.get('code')
})

export default role_serializer
