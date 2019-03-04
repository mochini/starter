import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const index = (reducers) => {

  ReactDOM.render(<App reducers={ reducers } />, document.getElementById('main'))

}

export default index
