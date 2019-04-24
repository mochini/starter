class App {

  store = null

  _handlePause = this._handlePause.bind(this)
  _handleReady = this._handleReady.bind(this)
  _handleRecieve = this._handleRecieve.bind(this)
  _handleResume = this._handleResume.bind(this)

  constructor() {
    this.store = window.localforage.createInstance({
      name: 'local',
      storeName: 'starter'
    })
    document.addEventListener('deviceready', this._handleReady, false)
    document.addEventListener('message', this._handleRecieve, false)
    document.addEventListener('pause', this._handlePause, false)
    document.addEventListener('resume', this._handleResume, false)
  }

  _handleReady() {
    screen.orientation.lock('portrait')
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', 'http://localhost:3000')
    iframe.setAttribute('border', 0)
    const body = document.getElementById('body')
    body.appendChild(iframe)
  }

  _handleRecieve(e) {
    const message = e.data
    // if(message.action === 'allowSleep') return allowSleep()
    // if(message.action === 'keepAwake') return keepAwake()
    // if(message.action === 'openWindow') return openWindow(message.data)
    // if(message.action === 'signin') return signin(message.data)
    // if(message.action === 'getContactsPermission') return getContactsPermission()
    // if(message.action === 'getContacts') return getContacts()
  }

  _handlePause() {
  }

  _handleResume() {
  }

}

new App()
