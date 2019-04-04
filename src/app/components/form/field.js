import CheckboxGroup from './checkboxgroup'
import Numberfield from './numberfield'
import RadioGroup from './radiogroup'
import Videofield from './videofield'
import Colorfield from './colorfield'
import Phonefield from './phonefield'
import Emailfield from './emailfield'
import Moneyfield from './moneyfield'
import Datefield from './datefield'
import Textfield from './textfield'
import Filefield from './filefield'
import PropTypes from 'prop-types'
import Textarea from './textarea'
import Dropdown from './dropdown'
import Lookup from './lookup'
import React from 'react'

class Field extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    field: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { errors, field } = this.props
    return (
      <div className="field">
        { field.label && <div className="field-label">{ field.label }</div> }
        { field.instructions && <div className="field-instructions">{ field.instructions }</div> }
        { field.type === 'textarea' && <Textarea { ...this._getField(field) } /> }
        { field.type === 'textfield' && <Textfield { ...this._getField(field) } /> }
        { field.type === 'colorfield' && <Colorfield { ...this._getField(field) } /> }
        { field.type === 'datefield' && <Datefield { ...this._getField(field) } /> }
        { field.type === 'numberfield' && <Numberfield { ...this._getField(field) } /> }
        { field.type === 'phonefield' && <Phonefield { ...this._getField(field) } /> }
        { field.type === 'emailfield' && <Emailfield { ...this._getField(field) } /> }
        { field.type === 'moneyfield' && <Moneyfield { ...this._getField(field) } /> }
        { field.type === 'videofield' && <Videofield { ...this._getField(field) } /> }
        { field.type === 'dropdown' && <Dropdown { ...this._getField(field) } /> }
        { field.type === 'checkboxgroup' && <CheckboxGroup { ...this._getField(field) } /> }
        { field.type === 'radiogroup' && <RadioGroup { ...this._getField(field) } /> }
        { field.type === 'lookup' && <Lookup { ...this._getField(field) } /> }
        { field.type === 'filefield' && <Filefield { ...this._getField(field) } /> }
        { errors[field.name] && <div className="error-message">{ errors[field.name] }</div> }
      </div>
    )
  }

  _getField(field) {
    const { data, errors } = this.props
    return {
      defaultValue: data[field.name],
      error: errors[field.name],
      ...field,
      onReady: this._handleReady.bind(this, field.name),
      onChange: this._handleChange.bind(this, field.name)
    }
  }

  _handleChange(name, value) {
    this.props.onChange(name, value)
  }

  _handleReady(name) {
    this.props.onReady(name)
  }

}

export default Field
