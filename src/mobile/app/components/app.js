import Contacts from './contacts'
import Insomnia from './insomnia'

class App {

  iframe = null

  _handleReady = this._handleReady.bind(this)
  _handleRecieve = this._handleRecieve.bind(this)

  constructor() {
    document.addEventListener('deviceready', this._handleReady, false)
    document.addEventListener('message', this._handleRecieve, false)
    this.contacts = new Contacts()
    this.insomnia = new Insomnia()
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
    const message = e.data
    if(message.action === 'getContactsPermission') return this._handleGetContactsPermission()
    // if(message.action === 'allowSleep') return allowSleep()
    // if(message.action === 'keepAwake') return keepAwake()
    // if(message.action === 'openWindow') return openWindow(message.data)
    // if(message.action === 'signin') return signin(message.data)
    // if(message.action === 'getContacts') return getContacts()
  }


  _handleSend(action, data) {
    this.iframe.contentWindow.postMessage({ action, data }, '*')
  }
  
}

export default App
