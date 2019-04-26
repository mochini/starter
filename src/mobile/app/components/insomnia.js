import PropTypes from 'prop-types'
import React from 'react'

class Insomnia extends React.Component {

  static contextTypes = {
    app: PropTypes.object
  }

  static propTypes = {}

  _handlePause = this._handlePause.bind(this)
  _handleResume = this._handleResume.bind(this)

  render() {
    return null
  }

  componentDidMount() {
    document.addEventListener('pause', this._handlePause, false)
    document.addEventListener('resume', this._handleResume, false)
  }

  recieve(action, data) {
  }

  _handlePause() {
  }

  _handleResume() {
  }

}

export default Insomnia
