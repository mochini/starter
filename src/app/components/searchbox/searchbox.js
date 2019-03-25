import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Searchbox extends React.Component {

  static propTypes = {
    autoFocus: PropTypes.bool,
    active: PropTypes.bool,
    prompt: PropTypes.string,
    q: PropTypes.string,
    onAbort: PropTypes.func,
    onBegin: PropTypes.func,
    onChange: PropTypes.func,
    onEnd: PropTypes.func,
    onIcon: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
    autoFocus: false,
    prompt: 'Search...',
    q: '',
    onChange: (value) => {}
  }

  input = null

  _handleAbort = this._handleAbort.bind(this)
  _handleBegin = this._handleBegin.bind(this)
  _handleChange = _.throttle(this._handleChange, 500)
  _handleEnd = this._handleEnd.bind(this)
  _handleIcon = this._handleIcon.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { q } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="searchbox-container">
          <div className="searchbox-icon">
            <i className="fa fa-search" />
          </div>
          <div className="searchbox-field">
            <input ref={ node => this.input  = node} { ...this._getInput() } />
          </div>
          { q.length > 0 &&
            <div className="searchbox-remove-icon" onClick={ this._handleAbort}>
              <i className="fa fa-times-circle" />
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    if(this.props.autoFocus) this.input.focus()
  }

  _getClass() {
    const classes = ['searchbox']
    if(this.props.active) classes.push('active')
    return classes.join(' ')
  }

  _getInput() {
    const { prompt, q } = this.props
    return {
      type: 'text',
      placeholder: prompt,
      value: q,
      onFocus: this._handleBegin,
      onBlur: this._handleEnd,
      onChange: this._handleType
    }
  }

  componentDidUpdate(prevProps) {
    const { q } = this.props
    if(q !== prevProps.q) this._handleChange(q)
  }

  _handleIcon() {
    this.props.onIcon()
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleChange(q) {
    this.props.onChange(q)
  }

  _handleEnd() {
    this.props.onEnd()
  }

  _handleType(e) {
    const { onType } = this.props
    onType(e.target.value)
  }

  _handleAbort() {
    this.props.onAbort()
  }

}

export default Searchbox
