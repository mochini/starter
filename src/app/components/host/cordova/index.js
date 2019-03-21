import React from 'react'
import PropTypes from 'prop-types'

class Cordova extends React.Component {

  static childContextTypes = {
    host: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    permission: PropTypes.string,
    user: PropTypes.object
  }

  contacts = null
  contactsPermisssions = null

  state = {
    hasFocus: true
  }

  _handleAllowSleep = this._handleAllowSleep.bind(this)
  _handleBlurFocus = this._handleBlurFocus.bind(this)
  _handleGetContactsSend = this._handleGetContactsSend.bind(this)
  _handleGetContactsReceive = this._handleGetContactsReceive.bind(this)
  _handleGetContactsPermissionSend = this._handleGetContactsPermissionSend.bind(this)
  _handleGetContactsPermissionReceive = this._handleGetContactsPermissionReceive.bind(this)
  _handleHasFocus = this._handleHasFocus.bind(this)
  _handleKeepAwake = this._handleKeepAwake.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handlePushRoute = this._handlePushRoute.bind(this)
  _handleReceiveMessage = this._handleReceiveMessage.bind(this)
  _handleSignin = this._handleSignin.bind(this)

  render() {
    return (
      <div className="cordova">
        { this.props.children }
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('message', this._handleReceiveMessage, false)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this._handleReceiveMessage, false)
  }

  getChildContext() {
    return {
      host: {
        type: 'cordova',
        getContacts: this._handleGetContactsSend,
        getContactsPermission: this._handleGetContactsPermissionSend,
        allowSleep: this._handleAllowSleep,
        hasFocus: this._handleHasFocus,
        signin: this._handleSignin,
        keepAwake: this._handleKeepAwake,
        openWindow: this._handleOpenWindow
      }
    }
  }

  _handleAllowSleep() {
    this._handleSendMessage('allowSleep')
  }

  _handleBlurFocus(hasFocus) {
    this.setState({ hasFocus })
  }

  _handleGetContactsPermissionSend(callback) {
    this.contactsPermissions = callback
    this._handleSendMessage('getContactsPermission')
  }

  _handleGetContactsPermissionReceive(result) {
    this.contactsPermissions(result)
    this.contactsPermissions = null
  }

  _handleGetContactsSend(callback) {
    this.contacts = callback
    this._handleSendMessage('getContacts')
  }

  _handleGetContactsReceive(result) {
    this.contacts(result)
    this.contacts = null
  }

  _handleHasFocus() {
    return this.state.hasFocus
  }

  _handleKeepAwake() {
    this._handleSendMessage('keepAwake')
  }

  _handleOpenWindow(url) {
    this._handleSendMessage('openWindow', url)
  }

  _handlePushRoute(route) {
    this.context.router.push(route)
  }

  _handleReceiveMessage(e) {
    if(e.origin !== 'file://') return
    const message = e.data
    if(message.action === 'pushPath') {
      window.location.href = message.data.path
    }
    if(message.action === 'pushRoute') {
      this._handlePushRoute(message.data.route)
    }
    if(message.action === 'pause') {
      this._handleBlurFocus(false)
    }
    if(message.action === 'resume') {
      this._handleBlurFocus(true)
    }
    if(message.action === 'getContactsPermission') {
      this._handleGetContactsPermissionReceive(message.data)
    }
    if(message.action === 'getContacts') {
      this._handleGetContactsReceive(message.data)
    }
  }

  _handleSignin(auth_url) {
    this._handleSendMessage('signin', auth_url)
  }

  _handleSendMessage(action, data = null) {
    window.parent.postMessage({
      action,
      data
    }, '*')
  }


}

export default Cordova
