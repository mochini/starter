const error = (err, req, res, next) => {

  if(err.status) {

    res.status(err.status).json({
      message: err.message
    })

  } else if(err.errors) {

    res.status(422).json({
      message: 'Unable to save record',
      errors: err.toJSON()
    })

  } else {

    res.status(500).json({
      message: err.message
    })

  }

}

export default error
