class App {

  services = {}
  iframe = null

  _handleReady = this._handleReady.bind(this)
  _handleRecieve = this._handleRecieve.bind(this)

  constructor() {
    document.addEventListener('deviceready', this._handleReady, false)
    document.addEventListener('message', this._handleRecieve, false)
  }

  _handleReady() {
    this.iframe = document.createElement('iframe')
    this.iframe.setAttribute('src', 'http://localhost:3000')
    this.iframe.setAttribute('border', 0)
    if(window.navigator.userAgent.match(/Windows/)) {
      document.getElementById('header').classList.add('hidden')
    }
    document.getElementById('body').appendChild(this.iframe)
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
