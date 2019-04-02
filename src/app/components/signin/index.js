import PropTypes from 'prop-types'
import Signin from './signin'
import Reset from './reset'
import React from 'react'

class Main extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  state = {
    mode: 'signin'
  }

  _handleChangeMode = this._handleChangeMode.bind(this)

  render() {
    const { mode } = this.state
    return (
      <div className="signin-canvas">
        { mode === 'reset' && <Reset { ...this._getReset() } /> }
        { mode === 'signin' && <Signin { ...this._getSignin() } /> }
      </div>
    )
  }

  _getReset() {
    return {
      onChangeMode: this._handleChangeMode
    }
  }

  _getSignin() {
    return {
      onChangeMode: this._handleChangeMode
    }
  }

  _handleChangeMode(mode) {
    this.setState({ mode })
  }


}

export default Main
