import PropTypes from 'prop-types'
import Electron from './electron'
import Browser from './browser'
import Cordova from './cordova'
import React from 'react'

class Host extends React.PureComponent {

  static contextTypes = {
  }

  static propTypes = {
    children: PropTypes.any
  }

  constructor(props) {
    super(props)
    this.host = this._getHost()
  }

  render() {
    return (
      <this.host>
        { this.props.children }
      </this.host>
    )
  }

  _getHost() {
    if(navigator.userAgent.match(/Cordova/) !== null) {
      return Cordova
    } else if(navigator.userAgent.match(/Electron/) !== null) {
      return Electron
    } else {
      return Browser
    }
  }


}

export default Host
