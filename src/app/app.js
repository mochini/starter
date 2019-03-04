import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import createlocalStorage from 'redux-local-storage'
import { combineReducers } from 'redux-rubberstamp'
import createApiRequest from 'redux-api-request'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'
import localforage from 'localforage'
import PropTypes from 'prop-types'
import React from 'react'

import RouterStack from './components/stack/router'
import NotFound from './pages/not_found'
import Home from './pages/home'

class App extends React.Component {

  static propTypes = {
    reducers: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.store = this._getStore()
  }

  render() {
    return (
      <Provider store={ this.store }>
        <Router>
          <RouterStack { ...this._getStack() } />
        </Router>
      </Provider>
    )
  }

  _getStore() {
    const reducers = combineReducers(this.props.reducers)
    const loggerMiddleware = createLogger({ collapsed: true })
    const apiRequestMiddleware = createApiRequest({
      defaultHost: process.env.API_HOST
    })
    const localStorageMiddleware = createlocalStorage(localforage.createInstance({
      name: 'local',
      storeName: 'collegetour'
    }))
    const middleware = [
      thunkMiddleware,
      apiRequestMiddleware,
      localStorageMiddleware,
      ...(process.env.NODE_ENV !== 'production' || window.location.search.match(/log=true/) !== null) ? [loggerMiddleware] : []
    ]
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
    return createStoreWithMiddleware(reducers)
  }

  _getStack() {
    return {
      routes: [
        { path: '/', component: Home },
        { path: '/*', component: NotFound }
      ]
    }
  }

}

export default hot(module)(App)
