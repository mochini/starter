import PropTypes from 'prop-types'
import Format from '../../format'
import Token from '../../token'
import Chooser from './chooser'
import React from 'react'

class Lookup extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.bool,
    cid: PropTypes.string,
    defaultValue: PropTypes.any,
    endpoint: PropTypes.string,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    text: PropTypes.string,
    format: PropTypes.any,
    selected: PropTypes.array,
    onBegin: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Choose a field',
    format: Token,
    multiple: false,
    text: 'text',
    value: 'value',
    onChange: () => {}
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { format, placeholder, selected, text } = this.props
    return (
      <div className="lookup" tabIndex={ 0 }>
        <div className="lookup-field" onClick={ this._handleBegin }>
          { selected.length === 0 && <span>{ placeholder }</span> }
          { selected.length > 0 &&
            selected.map((item, index) => (
              <Format key={`item_${index}`} { ...item } format={ format } value={ item[text] } />
            ))
          }
        </div>
        { selected.length > 0 &&
          <div className="datefield-remove" onClick={ this._handleClear }>
            <i className="fa fa-times-circle" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { active, defaultValue, selected, onChange, onSet } = this.props
    const { form } = this.context
    if(defaultValue !== prevProps.defaultValue && defaultValue) {
      onSet(defaultValue)
    }
    if(prevProps.selected !== selected) {
      onChange(selected)
    }
    if(active !== prevProps.active) {
      if(active) return form.push(<Chooser { ...this._getChooser() } />)
      form.pop()
    }
  }

  _getChooser() {
    const { cid, endpoint, format, multiple, text, value, onCancel, onSet } = this.props
    return {
      cid,
      endpoint,
      format,
      multiple,
      text,
      value,
      onCancel,
      onSet
    }
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleClear() {
    this.props.onClear()
  }

}

export default Lookup
