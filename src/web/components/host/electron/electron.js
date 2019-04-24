import React from 'react'
import PropTypes from 'prop-types'

class Browser extends React.PureComponent {

  static childContextTypes = {
    host: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    unseen: PropTypes.number,
    onSetTitle: PropTypes.func
  }

  static defaultProps = {}

  _handleHasFocus = this._handleHasFocus.bind(this)
  _handleOpenWindow = this._handleOpenWindow.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleSetTitle = this._handleSetTitle.bind(this)
  _handleUpdateHead = this._handleUpdateHead.bind(this)

  render() {
    return (
      <div className="electron">
        { this.props.children }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { title, unseen } = this.props
    if(title !== prevProps.title || unseen !== prevProps.unseen) {
      this._handleUpdateHead()
    }
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
        setTitle: this._handleSetTitle,
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

  _handleSetTitle(title) {
    this.props.onSetTitle(title)
  }

  _handleUpdateHead() {
    const { unseen } = this.props
    const title = this.props.title || 'Starter'
    const count = unseen > 0 ? 'x' : '0'
    const titlecount = unseen > 0 ? ` (${unseen})` : ''
    const link = document.getElementById('favicon')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = `/admin/images/icons/favicon-${count}.png`
    document.getElementsByTagName('head')[0].appendChild(link)
    document.getElementsByTagName('title')[0].text = title + titlecount
  }

}

export default Browser
