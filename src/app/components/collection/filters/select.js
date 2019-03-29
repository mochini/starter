import PropTypes from 'prop-types'
import Search from '../../search'
import React from 'react'

class Select extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.object,
    endpoint: PropTypes.string,
    format: PropTypes.any,
    multiple: PropTypes.bool,
    options: PropTypes.array,
    selected: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {}

  _handleChange = this._handleChange.bind(this)

  render() {
    return <Search { ...this._getSearch() } />
  }

  _getDefaultValue() {
    const { defaultValue, multiple } = this.props
    if(!defaultValue) return null
    return multiple ? defaultValue.$in : defaultValue.$eq
  }

  _getSearch() {
    const { endpoint, format, multiple, options, selected, text, value } = this.props
    return {
      defaultValue: this._getDefaultValue(),
      endpoint,
      format,
      multiple,
      options,
      selected,
      text,
      value,
      onChange: this._handleChange
    }
  }

  _handleChange(selected) {
    const { multiple, onChange } = this.props
    if(multiple) return onChange({ $in: selected })
    const $eq = selected.length > 0 ? selected[0]: null
    return onChange({ $eq })
  }

}

export default Select
