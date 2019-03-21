import PropTypes from 'prop-types'
import React from 'react'

class Reset extends React.Component {

  static contextTypes = {}

  static propTypes = {
    errors: PropTypes.object,
    status: PropTypes.string,
    onChangeMode: PropTypes.func,
    onReset: PropTypes.func
  }

  static defaultProps = {}

  email = null
  state = {
    error: false
  }

  _handleReset = this._handleReset.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSignin = this._handleSignin.bind(this)

  render() {
    const { errors, status } = this.props
    return (
      <div className="signin">
        <div className="signin-header">
          <h1>Reset Password</h1>
        </div>
        <div className="signin-body">
          <form className={ this._getClass() } onSubmit={ this._handleSubmit }>
            <div className="field">
              <input type="text" placeholder="Email" ref={ node => this.email = node } />
              { errors && errors.email &&
                <span className="error">{ errors.email[0] }</span>
              }
            </div>
            <div className="field">
              <button className="ui fluid red button">
                { status === 'loading' ? <i className="fa fa-circle-o-notch fa-spin fa-fw" /> : 'Send Reset Email' }
              </button>
            </div>
          </form>
        </div>
        <div className="signin-footer">
          <div className="link" onClick={ this._handleSignin }>
            Back to Sign In
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'failure') this._handleShake()
      if(status === 'success') this._handleReset()
    }
  }

  _getClass() {
    const { error } = this.state
    const classes = ['ui','form']
    if(error) classes.push('animated shake')
    return classes.join(' ')
  }

  _handleReset() {}

  _handleSignin() {
    this.props.onChangeMode('signin')
  }

  _handleShake() {
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _handleSubmit(e) {
    const { onReset } = this.props
    const email = this.email.value
    onReset(email)
    e.preventDefault()
  }

}

export default Reset
