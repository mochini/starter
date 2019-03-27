import Colorfield from './colorfield'
import Datefield from './datefield'
import Textfield from './textfield'
import PropTypes from 'prop-types'
import Textarea from './textarea'
import React from 'react'

class Field extends React.Component {

  static contextTypes = {}

  static propTypes = {
    data: PropTypes.object,
    errors: PropTypes.object,
    field: PropTypes.object,
    onChange: PropTypes.func
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
      onChange: this._handleChange.bind(this, field.name)
    }
  }

  _handleChange(name, value) {
    this.props.onChange(name, value)
  }

}

export default Field
