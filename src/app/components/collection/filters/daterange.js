import PropTypes from 'prop-types'
import Search from '../../search'
import React from 'react'
import _ from 'lodash'

class Daterange extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.object,
    include: PropTypes.array,
    options: PropTypes.array,
    selected: PropTypes.string,
    onChange: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    include: ['this','last','next'],
    onChange: () => {}
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    return <Search { ...this._getSearch() } />
  }

  _getDefaultValue() {
    const { defaultValue } = this.props
    if(!defaultValue) return null
    return defaultValue.$dr
  }

  _getOptions() {
    const { include } = this.props
    const options = []
    if(_.includes(include, 'this')) options.push({ value: 'this_week', text: 'This Week' })
    if(_.includes(include, 'last')) options.push({ value: 'last_week', text: 'Last Week' })
    if(_.includes(include, 'next')) options.push({ value: 'next_week', text: 'Next Week' })
    if(_.includes(include, 'this')) options.push({ value: 'this_month', text: 'This Month' })
    if(_.includes(include, 'last')) options.push({ value: 'last_month', text: 'Last Month' })
    if(_.includes(include, 'next')) options.push({ value: 'next_month', text: 'Next Month' })
    if(_.includes(include, 'this')) options.push({ value: 'this_quarter', text: 'This Quarter' })
    if(_.includes(include, 'last')) options.push({ value: 'last_quarter', text: 'Last Quarter' })
    if(_.includes(include, 'next')) options.push({ value: 'next_quarter', text: 'Next Quarter' })
    if(_.includes(include, 'this')) options.push({ value: 'this_year', text: 'This Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_year', text: 'Last Year' })
    if(_.includes(include, 'next')) options.push({ value: 'next_year', text: 'Next Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_30', text: 'Last 30 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_30', text: 'Next 30 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_60', text: 'Last 60 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_60', text: 'Next 60 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_90', text: 'Last 90 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_90', text: 'Next 90 Days' })
    options.push({ value: 'ytd', text: 'Year to Date' })
    options.push({ value: 'ltd', text: 'Life to Date' })
    options.push({ value: 'custom', text: 'Custom' })
    return options
  }

  _getSearch() {
    return {
      defaultValue: this._getDefaultValue(),
      multiple: false,
      options: this._getOptions(),
      onChange: this._handleChange
    }
  }

  _handleChange(selected) {
    const { onChange } = this.props
    if(selected) return onChange({ $dr: selected })
  }

  _handleSet() {
    const { defaultValue, onSet } = this.props
    onSet(defaultValue.$dr)
  }

}

export default Daterange
