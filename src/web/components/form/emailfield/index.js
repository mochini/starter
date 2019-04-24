import PropTypes from 'prop-types'
import React from 'react'

class EmailField extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  email = null

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    return <input { ...this._getInput() }/>
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.value !== prevState.value) {
      this.props.onChange(this.state.value)
    }
  }

  _getInput() {
    const { value } = this.state
    return {
      className: 'ui input',
      type: 'email',
      placeholder: 'Email',
      value,
      ref: node => this.email = node,
      onChange: this._handleChange
    }
  }

  _handleChange() {
    this.setState({
      value: this.email.value
    })
  }

}

export default EmailField
