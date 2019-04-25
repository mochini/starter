class Geolocation {

  app = null

  _handleGetPermission = this._handleGetPermission.bind(this)
  _handleGetPosition = this._handleGetPosition.bind(this)

  constructor(app) {
    this.app = app
  }

  recieve(action, data) {
    if(action === 'getPermission') this._handleGetPermission()
    if(action === 'getPosition') this._handleGetPosition()
  }

  _handleGetPermission() {
    this.app.store.getItem('geolocation', (err, value) => {
      if(value !== true) {
        return this.app.store.setItem('geolocation', true, (err, value) => {
          this.app.send('geolocation', 'getPermission', 'unknown')
        })
      }
      navigator.geolocation.getCurrentPosition((position) => {
        this.app.send('geolocation', 'getPermission', 'granted')
      }, (err) => {
        this.app.send('geolocation','getPermission', 'denied')
      })
    })
  }

  _handleGetPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.app.send('geolocation', 'getPosition', position)
    }, (err) => {})
  }

}

export default Geolocation
