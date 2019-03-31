import { BrowserRouter as Router } from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend'
import Uploader from './components/uploader'
import Presence from './components/presence'
import { DragDropContext } from 'react-dnd'
import Tracker from './components/tracker'
import Network from './components/network'
import Drawer from './components/drawer'
import Portal from './components/portal'
import React, { Suspense } from 'react'
import { hot } from 'react-hot-loader'
import Tasks from './components/tasks'
import Flash from './components/flash'
import Modal from './components/modal'
import Root from './components/root'
import Host from './components/host'
import PropTypes from 'prop-types'
import routes from './routes'
import menu from './menu'
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
          <Network>
            <Tracker>
              <Host>
                <Router>
                  <Flash>
                    <Presence>
                      <Uploader>
                        <Modal>
                          <Drawer>
                            <Tasks>
                              <Portal { ...this._getPortal() } />
                            </Tasks>
                          </Drawer>
                        </Modal>
                      </Uploader>
                    </Presence>
                  </Flash>
                </Router>
              </Host>
            </Tracker>
          </Network>
        </Root>
      </Suspense>
    )
  }

  _getPortal() {
    return {
      menu,
      routes
    }
  }

}

App = DragDropContext(HTML5Backend)(App)
App = hot(module)(App)

export default hot(module)(App)
