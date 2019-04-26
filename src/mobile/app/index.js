import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

const handleReady = () => {
  ReactDOM.render(<App />, document.getElementById('main'))
}

document.addEventListener('deviceready', handleReady, false)
