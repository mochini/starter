const notFound = (req, res) => res.status(404).json({
  message: res.t('Unable to locate resource')
})

export default notFound
