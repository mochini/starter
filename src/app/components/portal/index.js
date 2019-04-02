import RouterStack from '../stack/router'
import Dashboard from '../dashboard'
import PropTypes from 'prop-types'
import React from 'react'

class Portal extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

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

  componentDidMount() {
    const { history } = this.context.router
    const { pathname, search, hash } = history.location
    const route = pathname + search + hash
    history.replace('/')
    if(route !== '/') history.push(route)
  }

}

export default Portal
