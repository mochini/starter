import { createStore, applyMiddleware } from 'redux'
import createlocalStorage from 'redux-local-storage'
import { combineReducers } from 'redux-rubberstamp'
import createApiRequest from 'redux-api-request'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import localforage from 'localforage'
import tokenMiddleware from './token'
import PropTypes from 'prop-types'
import React from 'react'

class Root extends React.PureComponent {

  static propTypes = {
    children: PropTypes.any,
    reducers: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.store = this._getStore()
  }

  render() {
    return (
      <Provider store={ this.store }>
        { this.props.children }
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
      storeName: 'starter'
    }))
    const middleware = [
      thunkMiddleware,
      tokenMiddleware,
      apiRequestMiddleware,
      localStorageMiddleware,
      ...(process.env.NODE_ENV !== 'production' || window.location.search.match(/log=true/) !== null) ? [loggerMiddleware] : []
    ]
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
    return createStoreWithMiddleware(reducers)
  }


}

export default Root
