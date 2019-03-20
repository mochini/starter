const notFound = (req, res) => res.status(404).json({
  message: res.__('Unable to locate resource')
})

export default notFound
