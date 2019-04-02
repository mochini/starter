import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Avatar from '../avatar'
import React from 'react'
import Edit from './edit'

class Account extends React.PureComponent {

  static contextTypes = {
    drawer: PropTypes.object,
    modal: PropTypes.object,
    presence: PropTypes.object
  }

  static propTypes = {
    routes: PropTypes.array,
    t: PropTypes.func
  }

  static defaultProps = {}

  _handleSignout = this._handleSignout.bind(this)
  _handleEdit = this._handleEdit.bind(this)

  render() {
    const { user } = this.context.presence
    const { t } = this.props
    return (
      <div className="account">
        <div className="account-header">
          <div className="account-identity">
            <Avatar user={ user } />
            <h1>{ user.full_name }</h1>
            <p>{ user.email }</p>
          </div>
        </div>
        <div className="account-items">
          <div className="account-item" onClick={ this._handleEdit }>
            { t('Edit Account') }
          </div>
          <div className="account-item" onClick={ this._handleSignout }>
            { t('Sign Out') }
          </div>
        </div>
      </div>
    )
  }

  _handleEdit() {
    this.context.modal.open(Edit)
    this.context.drawer.close()
  }

  _handleSignout() {
    this.context.presence.signout()
  }

}

export default withTranslation()(Account)
