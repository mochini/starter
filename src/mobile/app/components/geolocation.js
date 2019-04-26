import PropTypes from 'prop-types'
import React from 'react'

class Geolocation extends React.Component {

  static contextTypes = {
    app: PropTypes.object,
    message: PropTypes.object
  }

  static propTypes = {}

  _handleDeny = this._handleDeny.bind(this)
  _handleGetPosition = this._handleGetPosition.bind(this)
  _handleRecieve = this._handleRecieve.bind(this)

  render() {
    return null
  }

  componentDidMount() {
    document.addEventListener('message', this._handleRecieve, false)
  }

  _getMessage() {
    return {
      color: 'green',
      icon: 'map-marker',
      title: 'Access Location',
      text: 'If you grant us access, we can show you records close you.',
      onAllow: this._handleGetPosition,
      onDeny: this._handleDeny
    }
  }

  _handleGetPosition() {
    const { app, message } = this.context
    const { store } = app
    store.getItem('geolocation', (err, value) => {
      if(value !== true) {
        return store.setItem('geolocation', true, (err, value) => {
          message.set(this._getMessage())
        })
      }
      navigator.geolocation.getCurrentPosition((position) => {
        message.clear()
        this.app.send('geolocation', 'get', position)
      }, (err) => {
        message.clear()
        console.log(err)
      })
    })
  }

  _handleDeny() {
    this.context.message.clear()
  }

  _handleRecieve(service, action, data) {
    if(service !== 'geolocation') return
    if(action === 'get') this._handleGetPosition()
  }

}

export default Geolocation
