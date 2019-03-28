import Searchbox from '../searchbox'
import Infinite from '../infinite'
import PropTypes from 'prop-types'
import Dynamic from './dynamic'
import Options from './options'
import Token from '../token'
import React from 'react'
import _ from 'lodash'

class Search extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.any,
    endpoint: PropTypes.string,
    format: PropTypes.any,
    multiple: PropTypes.bool,
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
    format: Token,
    multiple: false,
    text: 'title',
    value: 'id',
    onChange: () => {}
  }

  _handleToggle = this._handleToggle.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { options } = this.props
    if(options) return (
      <div className="search-list">
        <Options { ...this._getOptions() } />
      </div>
    )
    return (
      <div className="search">
        <div className="search-header">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        <div className="search-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet()
  }

  componentDidUpdate(prevProps) {
    const { defaultValue, selected } = this.props
    if(!_.isEqual(defaultValue, prevProps.defaultValue)) {
      this._handleSet()
    } else if(!_.isEqual(selected, prevProps.selected)) {
      this._handleChange()
    }
  }

  _getDynamic() {
    const { format, selected, text, value } = this.props
    return {
      format,
      selected,
      text,
      value,
      onToggle: this._handleToggle
    }
  }

  _getSearchbox() {
    return {
      label: 'Find item',
      onChange: this._handleType
    }
  }

  _getInfinite() {
    const { q, endpoint } = this.props
    return {
      endpoint,
      filter: { q },
      parentProps: this._getDynamic(),
      layout: Dynamic
    }
  }

  _getOptions() {
    const { format, options, selected, text, value } = this.props
    return {
      format,
      options,
      selected,
      text,
      value,
      onToggle: this._handleToggle
    }
  }

  _handleChange() {
    const { multiple, selected, onChange } = this.props
    const value = multiple ? selected : (selected[0] || null)
    onChange(value)
  }

  _handleSet() {
    const { defaultValue, onSet } = this.props
    onSet(_.castArray(defaultValue))
  }

  _handleType(q) {
    this.props.onQuery(q)
  }

  _handleToggle(value) {
    const { multiple } = this.props
    this.props.onToggle(multiple, value)
  }

}

export default Search
