import RouterStack from '../stack/router'
import Dashboard from '../dashboard'
import PropTypes from 'prop-types'
import Account from '../account'
import Menu from '../menu'
import React from 'react'

class Portal extends React.Component {

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any,
    routes: PropTypes.array,
    t: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { routes } = this.props
    return (
      <div className="portal">
        <Dashboard />
        <RouterStack routes={ routes } />
      </div>
    )
  }

}

export default Portal
