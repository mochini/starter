import SocketClient from 'socket.io-client'
import PropTypes from 'prop-types'
import React from 'react'

class Network extends React.Component {

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {}

  client = null

  render() {
    return this.props.children
  }

  componentDidMount() {
    const socketUrl = `${window.location.protocol}//${window.location.hostname}:3002`
    this.client = SocketClient(socketUrl)
  }

}

export default Network
