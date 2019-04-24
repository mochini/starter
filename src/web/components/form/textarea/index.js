import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TextArea extends React.PureComponent {

  static propTypes = {
    autoGrow: PropTypes.bool,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    autoGrow: false,
    placeholder: '',
    rows: 5,
    onChange: () => {},
    onReady: () => {}
  }

  input = null

  state = {
    value: ''
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    return <textarea ref={ node => this.input = node } { ...this._getTextarea() } />
  }

  componentDidMount() {
    const { autoGrow, defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      value: _.toString(defaultValue)
    })
    if(autoGrow) this.input.style.height = `${this.input.scrollHeight}px`
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

  _getTextarea() {
    const { placeholder, rows } = this.props
    const { value } = this.state
    return {
      placeholder,
      rows,
      tabIndex: 0,
      value,
      onChange: this._handleChange.bind(this)
    }
  }

  _handleChange(event) {
    if(this.props.autoGrow) this.input.style.height = `${this.input.scrollHeight}px`
    this.setValue(event.target.value)
  }

  setValue(value) {
    this.setState({ value })
  }

}

export default TextArea
