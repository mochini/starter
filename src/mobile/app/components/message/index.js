import PropTypes from 'prop-types'
import Message from './message'
import React from 'react'

class Container extends React.Component {

  static childContextTypes = {
    message: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  state = {
    message: null
  }

  _handleClear = this._handleClear.bind(this)
  _handleSet = this._handleSet.bind(this)

  render() {
    const { message } = this.state
    return (
      <div className="message-container">
        { message && <Message { ...message } /> }
        { this.props.children }
      </div>
    )
  }

  getChildContext() {
    return {
      message: {
        clear: this._handleClear,
        set: this._handleSet
      }
    }
  }

  _handleClear() {
    const message = null
    this.setState({ message })
  }

  _handleSet(message) {
    this.setState({ message })
  }

}

export default Container
