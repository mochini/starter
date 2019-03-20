import PropTypes from 'prop-types'
import React from 'react'

class Tracker extends React.Component {

  static childContextTypes = {
    tracker: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {}

  _handleIdentify = this._handleIdentify.bind(this)
  _handleTrack = this._handleTrack.bind(this)

  render() {
    return this.props.children
  }

  getChildContext() {
    return {
      tracker: {
        identify: this._handleIdentify,
        track: this._handleTrack
      }
    }
  }

  _handleIdentify(user) {
    console.log('identify', user)
  }

  _handleTrack(event, properties) {
    console.log(event, properties)
  }

}

export default Tracker
