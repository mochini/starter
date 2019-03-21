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
import Host from './components/host'
import PropTypes from 'prop-types'
import routes from './routes'
import './components/i18n'

class App extends React.Component {

  static propTypes = {
    reducers: PropTypes.array
  }

  render() {
    const { reducers } = this.props
    return (
      <Suspense fallback={ null }>
        <Root reducers={ reducers }>
          <Tracker>
            <Host>
              <Router>
                <Flash>
                  <Presence>
                    <Uploader>
                      <Modal>
                        <Portal routes={ routes } />
                      </Modal>
                    </Uploader>
                  </Presence>
                </Flash>
              </Router>
            </Host>
          </Tracker>
        </Root>
      </Suspense>
    )
  }

}

export default hot(module)(App)
