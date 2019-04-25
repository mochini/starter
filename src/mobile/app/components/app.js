import Authentication from './authentication'
import Notifications from './notifications'
import Contacts from './contacts'
import Insomnia from './insomnia'
import Browser from './browser'
import Camera from './camera'

class App {

  services = {}
  iframe = null

  _handleReady = this._handleReady.bind(this)
  _handleRecieve = this._handleRecieve.bind(this)

  constructor() {
    document.addEventListener('deviceready', this._handleReady, false)
    document.addEventListener('message', this._handleRecieve, false)
    this.services.authentication = new Authentication()
    this.services.browser = new Browser()
    this.services.camera = new Camera()
    this.services.contacts = new Contacts()
    this.services.nsomnia = new Insomnia()
    this.services.notifications = new Notifications()
  }

  _handleReady() {
    screen.orientation.lock('portrait')
    this.iframe = document.createElement('iframe')
    this.iframe.setAttribute('src', 'http://localhost:3000')
    this.iframe.setAttribute('border', 0)
    const body = document.getElementById('cordova')
    body.appendChild(this.iframe)
    this._handleGetContactsPermission()
  }

  _handleRecieve(e) {
    const { service, action, data } = e.data
    this.services[service].recieve(action, data, this._handleSend.bind(this, service))
  }

  _handleSend(service, action, data) {
    this.iframe.contentWindow.postMessage({ action, data }, '*')
  }

}

export default App
