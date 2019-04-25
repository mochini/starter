import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const handleReady = () => {
  ReactDOM.render(<App />, document.getElementById('main'))
}

document.addEventListener('deviceready', handleReady, false)
