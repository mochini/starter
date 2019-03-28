import Searchbox from '../searchbox'
import Infinite from '../infinite'
import PropTypes from 'prop-types'
import Options from './options'
import React from 'react'

class Dynamic extends React.Component {

  static contextTypes = {}

  static propTypes = {
    endpoint: PropTypes.string,
    format: PropTypes.any,
    q: PropTypes.string,
    searched: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    onQuery: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {}

  _handleType = this._handleType.bind(this)

  render() {
    return (
      <div className="search-dynamic">
        <div className="search-dynamic-header">
          <Searchbox { ...this._getSearchbox() } />
        </div>
        <div className="search-dynamic-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
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
      parentProps: this._getOptions(),
      layout: Options
    }
  }

  _getOptions() {
    const { format, searched, text, value, onToggle } = this.props
    return {
      format,
      searched,
      text,
      value,
      onToggle
    }
  }

  _handleType(q) {
    this.props.onQuery(q)
  }

}

export default Dynamic
