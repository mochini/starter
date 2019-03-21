import RouterStack from '../stack/router'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import React from 'react'

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
  _handleSignout = this._handleSignout.bind(this)

  render() {
    const { presence } = this.context
    const { routes, t } = this.props
    return (
      <div className="portal">
        <div onClick={ this._handleMenu }>
          <i className="fa fa-fw fa-bars" />
        </div>
        <div onClick={ this._handleAccount }>
          { presence.user.full_name }
        </div>
        <a onClick={ this._handleSignout }>
          { t('Sign Out') }
        </a>
        <div className="portal-body">
          <RouterStack routes={ routes } />
        </div>
      </div>
    )
  }

  _handleAccount() {
    this.context.drawer.open(<div>Account</div>, 'right')
  }

  _handleMenu() {
    this.context.drawer.open(<div>Menu</div>, 'left')
  }

  _handleSignout() {
    this.context.presence.signout()
  }

}

export default withTranslation()(Portal)
