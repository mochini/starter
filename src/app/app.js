import { BrowserRouter as Router } from 'react-router-dom'
import RouterStack from './components/stack/router'
import React, { Suspense } from 'react'
import { hot } from 'react-hot-loader'
import Root from './components/root'
import PropTypes from 'prop-types'
import routes from './routes'
import './components/i18n'

class App extends React.Component {

  static propTypes = {
    reducers: PropTypes.array
  }

  render() {
    return (
      <Suspense fallback={ null }>
        <Root { ...this._getRoot() }>
          <Router>
            <RouterStack { ...this._getStack() } />
          </Router>
        </Root>
      </Suspense>
    )
  }

  _getRoot() {
    const { reducers } = this.props
    return { reducers }
  }

  _getStack() {
    return { routes }
  }

}

export default hot(module)(App)
