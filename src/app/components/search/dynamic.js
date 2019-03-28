import PropTypes from 'prop-types'
import Options from './options'
import React from 'react'
import _ from 'lodash'

class Dynamic extends React.Component {

  static contextTypes = {}

  static propTypes = {
    format: PropTypes.any,
    records: PropTypes.array,
    selected: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    onToggle: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { records } = this.props
    return (records) ? <Options { ...this._getOptions() } /> : null
  }

  _getOptions() {
    const { format, records, selected, text, value, onToggle } = this.props
    return {
      format,
      options: records,
      selected,
      text,
      value,
      onToggle
    }
  }

}

export default Dynamic
