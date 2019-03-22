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

  _handleAccount() {
    this.context.drawer.open(<Account />, 'right')
  }

  _handleMenu() {
    this.context.drawer.open(<Menu />, 'left')
  }

}

export default Portal
