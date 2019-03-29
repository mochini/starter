const format = (express) => {

  express.response.format = function(data, format) {

    if(format === 'csv') return this.send('foo')

    return this.json(data)
  }

}
