import Authentication from './components/authentication'
import Notifications from './components/notifications'
import Geolocation from './components/geolocation'
import Contacts from './components/contacts'
import Insomnia from './components/insomnia'
import Browser from './components/browser'
import Message from './components/message'
import Camera from './components/camera'
import React from 'react'

class App extends React.Component {

  services = {}
  iframe = null

  state = {
    message: {
      color: 'green',
      icon: 'id-card-o',
      title: 'Access Contact List',
      text: 'If you grant us access, we can invite people from your phone\'s contact list. If not, you can still invite them manually.',
      buttons: [
        {
          label: 'No Thanks',
          handler: this._handleDeny
        },
        {
          label: 'Allow Access',
          handler: this._handleAllow
        }
      ]
    }
  }

  _handleRecieve = this._handleRecieve.bind(this)
  _handleSend = this._handleSend.bind(this)

  render() {
    const { message } = this.state
    return (
      <div className="cordova">
        { message && <Message { ...this._getMessage() } /> }
        <iframe { ...this._getIframe() } ref={ node => this.iframe = node } />
      </div>
    )
  }

  componentDidMount() {
    document.addEventListener('message', this._handleRecieve, false)
    this.store = window.localforage.createInstance({
      name: 'local',
      storeName: 'starter'
    })
    const app = {
      store: this.store,
      send: this._handleSend
    }
    this.services.authentication = new Authentication(app)
    this.services.browser = new Browser(app)
    this.services.camera = new Camera(app)
    this.services.contacts = new Contacts(app)
    this.services.geolocation = new Geolocation(app)
    this.services.nsomnia = new Insomnia(app)
    this.services.notifications = new Notifications(app)
  }

  _getMessage() {
    return {
      color: 'green',
      icon: 'id-card-o',
      title: 'Access Contact List',
      text: 'If you grant us access, we can invite people from your phone\'s contact list. If not, you can still invite them manually.',
      buttons: [
        {
          label: 'No Thanks',
          handler: this._handleDeny
        },
        {
          label: 'Allow Access',
          handler: this._handleAllow
        }
      ]
    }
  }

  _getIframe() {
    const { message } = this.state
    return {
      style: message ? { display: 'none' } : {},
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
