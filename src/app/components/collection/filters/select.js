import PropTypes from 'prop-types'
import Search from '../../search'
import React from 'react'

class Select extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.any,
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

  render() {
    return <Search { ...this._getSearch() } />
  }

  _getSearch() {
    return this.props
  }

}

export default Select
