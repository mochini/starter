import SessionSerializer from '../../serializers/session_serializer'

const route = async (req, res) => {

  if(!req.user) return res.status(404).json({
    message: res.t('You are not signedin')
  })

  res.status(200).json({
    data: SessionSerializer(req.user)
  })

}

export default route
