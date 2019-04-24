import localforage from 'localforage'

class App {

  store = null

  _handleReady = this._handleReady.bind(this)

  constructor() {
    this.store = localforage.createInstance({
      name: 'local',
      storeName: 'electron'
    })
    this._handleReady()
  }

  _handleReady() {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', 'http://localhost:3000')
    iframe.setAttribute('border', 0)
    if(window.navigator.userAgent.match(/Windows/)) {
      document.getElementById('header').classList.add('hidden')
    }
    document.getElementById('body').appendChild(iframe)
  }

}

new App()
