import PropTypes from 'prop-types'
import React from 'react'

class Geolocation extends React.Component {

  static contextTypes = {
    app: PropTypes.object
  }

  static propTypes = {}

  _handleGetPermission = this._handleGetPermission.bind(this)
  _handleGetPosition = this._handleGetPosition.bind(this)

  render() {
    return null
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
