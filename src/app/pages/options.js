import PropTypes from 'prop-types'
import React from 'react'
import Filters from '../components/filters'

class Options extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <Filters { ...this._getFilters() }>
      </Filters>
    )
  }

  _getFilters() {
    return {
    }
  }


}

export default Options
