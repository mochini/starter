import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextField extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: '',
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    return <input { ...this._getInput() } />
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      value: _.toString(defaultValue)
    })
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.defaultValue !== prevProps.defaultValue) {
      this.setValue(this.props.defaultValue)
    }
    if(this.state.value !== prevState.value) {
      this.props.onChange(this.state.value )
    }
  }


  _getClass() {
    const classes = ['ui','fluid','input']
    return classes.join(' ')
  }

  _getInput() {
    const { placeholder } = this.props
    const { value } = this.state
    return {
      type: 'text',
      value,
      placeholder,
      onChange: this._handleChange.bind(this)
    }
  }

  _handleChange(event) {
    this.setValue(event.target.value)
  }

  setValue(value) {
    this.setState({ value })
  }

}

export default TextField
