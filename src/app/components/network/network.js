import { CSSTransition } from 'react-transition-group'
import SocketClient from 'socket.io-client'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Network extends React.PureComponent {

  static childContextTypes = {
    network: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    channels: PropTypes.any,
    children: PropTypes.any,
    listeners: PropTypes.any,
    online: PropTypes.bool,
    text: PropTypes.string,
    token: PropTypes.string,
    status: PropTypes.string,
    onClearAlert: PropTypes.func,
    onConnect: PropTypes.func,
    onDisconnect: PropTypes.func,
    onJoinChannel: PropTypes.func,
    onLeaveChannel: PropTypes.func,
    onRequest: PropTypes.func,
    onSetAlert: PropTypes.func,
    onSubscribe: PropTypes.func,
    onUnsubscribe: PropTypes.func
  }

  static defaultProps = {}

  client = null

  _handleConnect = this._handleConnect.bind(this)
  _handleDisconnect = this._handleDisconnect.bind(this)
  _handleJoinChannel = this._handleJoinChannel.bind(this)
  _handleJoinedChannel = this._handleJoinedChannel.bind(this)
  _handleLeaveChannel = this._handleLeaveChannel.bind(this)
  _handleLeftChannel = this._handleLeftChannel.bind(this)
  _handleMessage = this._handleMessage.bind(this)
  _handleOfflineAlert = this._handleOfflineAlert.bind(this)
  _handleOnlineAlert = this._handleOnlineAlert.bind(this)
  _handleRequest = this._handleRequest.bind(this)
  _handleSubscribe = this._handleSubscribe.bind(this)
  _handleUnsubscribe = this._handleUnsubscribe.bind(this)

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
    this.client.on('message', this._handleMessage)
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
        leaveChannel: this._handleLeaveChannel,
        request: this._handleRequest,
        subscribe: this._handleSubscribe,
        unsubscribe: this._handleUnsubscribe
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
    const { channels, online, onConnect } = this.props
    onConnect()
    if(online === null) return
    setTimeout(() => this._handleJoinChannel(channels), 500)
  }

  _handleDisconnect() {
    this.props.onDisconnect()
  }

  _handleJoinChannel(channels) {
    const { token } = this.props
    this.client.emit('join', token, channels, this._handleJoinedChannel)
  }

  _handleJoinedChannel(channel) {
    const { channels } = this.props
    if(_.includes(channels, channel)) return
    this.props.onJoinChannel(channel)
  }

  _handleLeaveChannel(channels) {
    const { token } = this.props
    this.client.emit('leave', token, channels, this._handleLeftChannel)
  }

  _handleLeftChannel(channel) {
    this.props.onLeaveChannel(channel)
  }

  _handleMessage({ channel, action, data }) {
    const { listeners } = this.props
    listeners.filter(listener => {
      return listener.channel === channel && listener.action === action
    }).map(listener => {
      listener.handler(data)
    })
  }

  _handleOfflineAlert() {
    this.props.onSetAlert('error', 'Unable to connect to the server')
  }

  _handleOnlineAlert() {
    this.props.onSetAlert('success', 'You\'re back online!')
    setTimeout(this.props.onClearAlert, 2500)
  }

  _handleRequest(request) {
    const { onRequest } = this.props
    onRequest(request)
  }

  _handleSubscribe({ channel, action, handler }) {
    const { listeners } = this.props
    if(_.find(listeners, { channel, action, handler })) return
    this.props.onSubscribe(channel, action, handler)
  }

  _handleUnsubscribe({ channel, action, handler }) {
    this.props.onUnsubscribe(channel, action, handler)
  }

}

const mapStateToProps = (state, props) => ({
  token: state.presence ? state.presence.token : null
})

export default connect(mapStateToProps)(Network)
