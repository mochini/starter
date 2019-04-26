import Authentication from '../authentication'
import Notifications from '../notifications'
import Geolocation from '../geolocation'
import Contacts from '../contacts'
import Insomnia from '../insomnia'
import PropTypes from 'prop-types'
import Browser from '../browser'
import Message from '../message'
import Camera from '../camera'
import React from 'react'

class App extends React.Component {

  static childContextTypes = {
    app: PropTypes.object
  }

  static propTypes = {}

  iframe = null

  store = window.localforage.createInstance({
    name: 'local',
    storeName: 'starter'
  })

  _handleRecieve = this._handleRecieve.bind(this)
  _handleSend = this._handleSend.bind(this)

  render() {
    return (
      <Message>
        <Authentication />
        <Notifications />
        <Geolocation />
        <Contacts />
        <Insomnia />
        <Browser />
        <Camera />
        <iframe { ...this._getIframe() } />
      </Message>
    )
  }

  componentDidMount() {
    document.addEventListener('message', this._handleRecieve, false)
  }

  getChildContext() {
    return {
      app: {
        store: this.store,
        send: this._handleSend
      }
    }
  }

  _getIframe() {
    return {
      ref: node => this.iframe = node,
      border: 0,
      src: 'http://localhost:3000'
    }
  }

  _handleRecieve(e) {
    const { service, action, data } = e.data
    this.services[service].recieve(action, data, this._handleSend.bind(this, service))
  }

  _handleSend(service, action, data) {
    this.iframe.contentWindow.postMessage({ service, action, data }, '*')
  }

}

export default App
