import RouterStack from '../stack/router'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import React from 'react'

class Portal extends React.Component {

  static contextTypes = {
    presence: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    routes: PropTypes.array,
    t: PropTypes.func
  }

  static defaultProps = {}

  _handleSignout = this._handleSignout.bind(this)

  render() {
    const { presence } = this.context
    const { routes, t } = this.props
    return (
      <div className="portal">
        { presence.user.full_name }
        <a onClick={ this._handleSignout }>
          { t('Sign Out') }
        </a>
        <div className="portal-body">
          <RouterStack routes={ routes } />
        </div>
      </div>
    )
  }

  _handleSignout() {
    this.context.presence.signout()
  }

}

export default withTranslation()(Portal)
