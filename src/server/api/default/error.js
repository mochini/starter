const error = (err, req, res, next) => {

  if(process.env.NODE_ENV !== 'production') {
    console.log(err)
  }

  if(err.status) return res.status(err.status).json({
    message: res.t(err.message)
  })

  if(err.errors) return res.status(422).json({
    message: res.t('Unable to save record'),
    errors: err.toJSON()
  })

  return res.status(500).json({
    message: err.message
  })

}

export default error
