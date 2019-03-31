import RouterStack from '../stack/router'
import Dashboard from '../dashboard'
import PropTypes from 'prop-types'
import React from 'react'

class Portal extends React.Component {

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any,
    menu: PropTypes.array,
    routes: PropTypes.array,
    t: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { menu, routes } = this.props
    return (
      <div className="portal">
        <Dashboard menu={ menu } />
        <RouterStack routes={ routes } />
      </div>
    )
  }

}

export default Portal
