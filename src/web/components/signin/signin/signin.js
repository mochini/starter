import PropTypes from 'prop-types'
import React from 'react'

class Signin extends React.PureComponent {

  static contextTypes = {
    flash: PropTypes.object,
    presence: PropTypes.object
  }

  static propTypes = {
    errors: PropTypes.object,
    status: PropTypes.string,
    token: PropTypes.string,
    onChangeMode: PropTypes.func,
    onSignin: PropTypes.func
  }

  static defaultProps = {}

  email = null
  password = null
  state = {
    error: false
  }

  _handleReset = this._handleReset.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)
  _handleSignin = this._handleSignin.bind(this)

  render() {
    const { status } = this.props
    return (
      <div className="signin">
        <div className="signin-header">
          <h1>Signin</h1>
        </div>
        <div className="signin-body">
          <form className={ this._getClass() } onSubmit={ this._handleSubmit }>
            <div className="field">
              <input type="text" placeholder="Email" ref={ node => this.email = node } />
            </div>
            <div className="field">
              <input type="password" autoComplete="new-password" placeholder="Password" ref={ node => this.password = node } />
            </div>
            <div className="field">
              <button className="ui fluid red button">
                { status === 'loading' ? <i className="fa fa-circle-o-notch fa-spin fa-fw" /> : 'Signin'}
              </button>
            </div>
          </form>
        </div>
        <div className="signin-footer">
          <div className="link" onClick={ this._handleReset }>
            Forget your password?
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'failure') this._handleShake()
      if(status === 'success') this._handleSignin()
    }
  }

  _getClass() {
    const { error } = this.state
    const classes = ['ui','form']
    if(error) classes.push('animated shake')
    return classes.join(' ')
  }

  _handleReset() {
    this.props.onChangeMode('reset')
  }

  _handleFlash() {
    const { flash } = this.context
    const { errors } = this.props
    if(errors.email) return flash.set('error', errors.email[0])
    if(errors.password) return flash.set('error', errors.password[0])
  }

  _handleShake() {
    this._handleFlash()
    this.setState({ error: true })
    setTimeout(() => {
      this.setState({ error: false })
    }, 500)
  }

  _handleSignin() {
    const { token } = this.props
    this.context.presence.setToken(token)
  }

  _handleSubmit(e) {
    const { onSignin } = this.props
    const email = this.email.value
    const password = this.password.value
    onSignin(email, password)
    e.preventDefault()
  }

}

export default Signin
