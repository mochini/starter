import PropTypes from 'prop-types'
import Dynamic from './dynamic'
import Options from './options'
import React from 'react'
import _ from 'lodash'

class Select extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    format: PropTypes.any,
    options: PropTypes.array,
    q: PropTypes.string,
    selected: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onQuery: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    text: 'title',
    value: 'id',
    onChange: () => {}
  }

  render() {
    const { endpoint, options } = this.props
    return (
      <div className="search">
        { endpoint && <Dynamic { ...this._getDynamic() } /> }
        { options && <Options { ...this._getOptions() } /> }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet  } = this.props
    if(defaultValue) onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { defaultValue, selected, onChange, onSet } = this.props
    if(!_.isEqual(defaultValue, prevProps.defaultValue)) {
      onSet(defaultValue)
    } else if(!_.isEqual(selected, prevProps.selected)) {
      onChange(selected)
    }
  }

  _getDynamic() {
    const { endpoint, format, q, selected, text, value, onQuery, onToggle } = this.props
    return {
      endpoint,
      format,
      q,
      selected,
      text,
      value,
      onQuery,
      onToggle
    }
  }

  _getOptions() {
    const { format, options, selected, text, value, onToggle } = this.props
    return {
      format,
      records: options,
      selected,
      text,
      value,
      onToggle
    }
  }

}

export default Select
