import React from 'react'
import PropTypes from 'prop-types'

class Browser extends React.Component {

  static childContextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {}

  _handleHasFocus = this._handleHasFocus.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handleSignin = this._handleSignin.bind(this)

  render() {
    return (
      <div className="browser">
        { this.props.children }
        <a ref={ node => this.link = node } target="_blank" />
      </div>
    )
  }

  getChildContext() {
    return {
      host: {
        type: 'browser',
        getContacts: () => {},
        getContactsPermission: (callback) => callback('denied'),
        allowSleep: () => {},
        hasFocus: this._handleHasFocus,
        signin: this._handleSignin,
        keepAwake: () => {},
        openWindow: this._handleOpenWindow
      }
    }
  }

  _handleHasFocus() {
    return document.hasFocus()
  }

  _handleOpenWindow(url) {
    this.link.href = url
    this.link.click()
  }

  _handleSignin(auth_url) {
    window.location.href = auth_url
  }


}

export default Browser
