import localforage from 'localforage'
import App from './components/app'

window.store = localforage.createInstance({
  name: 'local',
  storeName: 'starter'
})

new App()
