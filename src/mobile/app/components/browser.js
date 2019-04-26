import PropTypes from 'prop-types'
import React from 'react'

class Browser extends React.Component {

  static contextTypes = {
    app: PropTypes.object
  }

  static propTypes = {}

  _handleOpen = this._handleOpen.bind(this)
  _handleRecieve = this._handleRecieve.bind(this)

  render() {
    return null
  }

  componentDidMount() {
    document.addEventListener('message', this._handleRecieve, false)
  }

  _handleOpen(url) {
    window.SafariViewController.isAvailable((available) => {
      if(!available) return window.open(url, '_blank', 'location=no')
      window.SafariViewController.show({
        url: url,
        hidden: false,
        animated: false,
        transition: 'curl',
        enterReaderModeIfAvailable: false,
        tintColor: '#DB2828',
        barColor: '#DB2828',
        controlTintColor: '#ffffff'
      },
      function(result) { },
      function(msg) { })
    })
  }

  _handleRecieve(service, action, data) {
    if(service !== 'browser') return
    if(action === 'open') this._handleOpen(data)
  }


}

export default Browser
