const route = async (req, res) => {

  res.status(200).respond(req.user, (user) => ({
    first_name: user.get('first_name'),
    last_name: user.get('last_name'),
    email: user.get('email'),
    photo_id: user.get('photo_id')
  }))

}

export default route
