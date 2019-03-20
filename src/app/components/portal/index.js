import PropTypes from 'prop-types'
import React from 'react'

class Portal extends React.Component {

  static contextTypes = {
    presence: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {}

  state = {
    account: false
  }

  _handleSignout = this._handleSignout.bind(this)

  render() {
    return (
      <div className="portal">
        <a onClick={ this._handleSignout }>Sign Out</a>
        <div className="portal-body">
          { this.props.children }
        </div>
      </div>
    )
  }

  _handleSignout() {
    this.context.presence.signout()
  }

}

export default Portal
