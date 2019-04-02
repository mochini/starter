import PropTypes from 'prop-types'
import Chooser from './chooser'
import moment from 'moment'
import React from 'react'

class Datefield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    month: PropTypes.number,
    placeholder: PropTypes.string,
    prompt: PropTypes.string,
    year: PropTypes.number,
    value: PropTypes.any,
    onBegin: PropTypes.func,
    onBusy: PropTypes.func,
    onClear: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    onReady: PropTypes.func,
    onSetCurrent: PropTypes.func,
    onSetValue: PropTypes.func
  }

  static defaultProps = {
    defaultValue: null,
    disabled: false,
    placeholder: 'Choose a date',
    prompt: 'Choose a date',
    tabIndex: 0,
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {},
    onSet: () => {}
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { placeholder, value } = this.props
    return (
      <div className="datefield">
        <div className="datefield-input" tabIndex={ 0 }>
          <div className="datefield-field" onClick={ this._handleBegin }>
            { value ? value.format('dddd, MMMM DD, YYYY') : <span>{ placeholder }</span> }
          </div>
          { value  &&
            <div className="datefield-remove" onClick={ this._handleClear }>
              <i className="fa fa-times-circle" />
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady, onSetCurrent, onSetValue } = this.props
    if(defaultValue) onSetValue(moment(defaultValue))
    const current = defaultValue ? moment(defaultValue) : moment()
    onSetCurrent(parseInt(current.format('MM')) - 1, parseInt(current.format('YYYY')))
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { active, defaultValue, value, onChange, onChoose } = this.props
    const { form } = this.context
    if(defaultValue !== prevProps.defaultValue && defaultValue) {
      onChoose(moment(defaultValue))
    }
    if(prevProps.value !== value) {
      if(value) onChange(value.format('YYYY-MM-DD'))
      if(!value) onChange(value)
    }
    if(active !== prevProps.active) {
      if(active) form.push(<Chooser { ...this._getChooser() } />)
      if(!active)form.pop()
    }
  }

  _getChooser() {
    return this.props
  }

  _getInput() {
    const { prompt, value } = this.props
    return {
      type: 'text',
      value,
      autoComplete: false,
      prompt
    }
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleClear() {
    this.props.onClear()
  }

}

export default Datefield
