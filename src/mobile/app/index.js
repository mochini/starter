import App from './components/app'

window.store = window.localforage.createInstance({
  name: 'local',
  storeName: 'starter'
})

new App()
