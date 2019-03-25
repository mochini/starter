import RouterStack from '../stack/router'
import PropTypes from 'prop-types'
import React from 'react'
import Menu from '../menu'
import Account from '../account'
import Avatar from '../avatar'

class Portal extends React.Component {

  static contextTypes = {
    drawer: PropTypes.object,
    presence: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    routes: PropTypes.array,
    t: PropTypes.func
  }

  static defaultProps = {}

  _handleAccount = this._handleAccount.bind(this)
  _handleMenu = this._handleMenu.bind(this)

  render() {
    const { routes } = this.props
    return (
      <div className="portal">
        <div className="portal-header">
          <div className="portal-header-menu" onClick={ this._handleMenu }>
            <i className="fa fa-fw fa-bars" />
          </div>
          <div className="portal-header-title">
            Starter
          </div>
          <div className="portal-header-account" onClick={ this._handleAccount }>
            <Avatar { ...this._getAvatar() } />
          </div>
        </div>
        <div className="portal-body">
          <RouterStack routes={ routes } />
        </div>
      </div>
    )
  }

  _getAvatar() {
    const { user } = this.context.presence
    return {
      user
    }
  }

  _getMenu() {
    return {
      items: [
        { label: 'Item 1', route: '/page1' },
        { label: 'Item 2', items: [
          { label: 'Item 2a', route: '/page2a' },
          { label: 'Item 2b', route: '/page2b' },
          { label: 'Item 2c', items: [
            { label: 'Item 2ci', route: '/page2ci' },
            { label: 'Item 2cii', route: '/page2cii' },
            { label: 'Item 2ciii', route: '/page2ciii' }
          ] }
        ] },
        { label: 'Item 3', route: '/page3' }
      ]
    }
  }

  _handleAccount() {
    this.context.drawer.open(<Account />, 'right')
  }

  _handleMenu() {
    this.context.drawer.open(<Menu { ...this._getMenu() } />, 'left')
  }

}

export default Portal
