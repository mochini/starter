import { BrowserRouter as Router } from 'react-router-dom'
import React, { Suspense } from 'react'
import { hot } from 'react-hot-loader'
import Uploader from './components/uploader'
import Presence from './components/presence'
import Tracker from './components/tracker'
import Portal from './components/portal'
import Flash from './components/flash'
import Modal from './components/modal'
import Root from './components/root'
import PropTypes from 'prop-types'
import routes from './routes'
import './components/i18n'

class App extends React.Component {

  static propTypes = {
    routes: PropTypes.array,
    reducers: PropTypes.array
  }

  render() {
    return (
      <Suspense fallback={ null }>
        <Root { ...this._getRoot() }>
          <Tracker>
            <Router>
              <Flash>
                <Presence>
                  <Uploader>
                    <Modal>
                      <Portal { ...this._getPortal() } />
                    </Modal>
                  </Uploader>
                </Presence>
              </Flash>
            </Router>
          </Tracker>
        </Root>
      </Suspense>
    )
  }

  _getRoot() {
    const { reducers } = this.props
    return { reducers }
  }

  _getPortal() {
    return { routes }
  }

}

export default hot(module)(App)
