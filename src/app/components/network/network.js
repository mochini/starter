import { CSSTransition } from 'react-transition-group'
import SocketClient from 'socket.io-client'
import PropTypes from 'prop-types'
import React from 'react'

class Network extends React.PureComponent {

  static childContextTypes = {
    network: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any,
    online: PropTypes.bool,
    text: PropTypes.string,
    status: PropTypes.string,
    onConnect: PropTypes.func,
    onDisconnect: PropTypes.func,
    onClearAlert: PropTypes.func,
    onSetAlert: PropTypes.func
  }

  static defaultProps = {}

  client = null

  _handleConnect = this._handleConnect.bind(this)
  _handleDisconnect = this._handleDisconnect.bind(this)
  _handleJoinChannel = this._handleJoinChannel.bind(this)
  _handleLeaveChannel = this._handleLeaveChannel.bind(this)
  _handleOfflineAlert = this._handleOfflineAlert.bind(this)
  _handleOnlineAlert = this._handleOnlineAlert.bind(this)

  render() {
    const { text } = this.props
    return (
      <div className={ this._getClass() }>
        { this.props.children }
        <CSSTransition in={ text !== null } timeout={ 250 } classNames="translatey" mountOnEnter={ true } unmountOnExit={ true }>
          <div className="network-status">
            { text }
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    const socketUrl = `${window.location.protocol}//${window.location.hostname}:3002`
    this.client = SocketClient(socketUrl)
    this.client.on('connect', this._handleConnect)
    this.client.on('disconnect', this._handleDisconnect)
  }

  componentDidUpdate(prevProps) {
    const { online } = this.props
    if(online !== prevProps.online) {
      if(prevProps.online === true) this._handleOfflineAlert()
      if(prevProps.online === false) this._handleOnlineAlert()
    }
  }

  getChildContext() {
    return {
      network: {
        joinChannel: this._handleJoinChannel,
        leaveChannel: this._handleLeaveChannel
      }
    }
  }

  _getClass() {
    const { status } = this.props
    const classes = ['network']
    if(status) classes.push(status)
    return classes.join(' ')
  }

  _handleConnect() {
    this.props.onConnect()
  }

  _handleDisconnect() {
    this.props.onDisconnect()
  }

  _handleJoinChannel(channel) {
    this.client.emit('join', channel)
  }

  _handleLeaveChannel(channel) {
    this.client.emit('leave', channel)
  }

  _handleOfflineAlert() {
    this.props.onSetAlert('error', 'Unable to connect to the server')
  }

  _handleOnlineAlert() {
    this.props.onSetAlert('success', 'You\'re back online!')
    setTimeout(this.props.onClearAlert, 2500)
  }

}

export default Network
