import PropTypes from 'prop-types'
import React from 'react'

class Camera extends React.Component {

  static contextTypes = {
    app: PropTypes.object
  }

  static propTypes = {}

  _handleGetPermission = this._handleGetPermission.bind(this)
  _handleGetPicture = this._handleGetPicture.bind(this)

  render() {
    return null
  }

  recieve(action, data) {
    if(action === 'getPermission') this._handleGetPermission()
    if(action === 'getPicture') this._handleGetPicture()
  }

  _handleGetPermission() {
    this.app.store.getItem('camera', (err, value) => {
      if(value !== true) {
        return this.app.store.setItem('camera', true, (err, value) => {
          this.app.send('camera', 'getPermission', 'unknown')
        })
      }
      navigator.camera.getPicture((image) => {
        this.app.send('camera', 'getPermission', 'granted')
      }, (err) => {
        this.app.send('camera','getPermission', 'denied')
      })
    })
  }

  _handleGetPicture() {
    navigator.geolocation.getCurrentPosition((image) => {
      this.app.send('camera', 'getPicture', image)
    }, (err) => {})
  }
}

export default Camera
