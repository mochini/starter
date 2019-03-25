import PropTypes from 'prop-types'
import Filter from './filter'
import React from 'react'

class Filters extends React.Component {

  static contextTypes = {}

  static propTypes = {
    filters: PropTypes.array,
    onChange: PropTypes.func
  }

  static defaultProps = {}

  _handleChange = this._handleChange.bind(this)

  render() {
    const { filters } = this.props
    return (
      <div className="filters">
        { filters.map((filter, index) => (
          <Filter key={`filter_${index}`} { ...this._getFilter(filter) } />
        ))}
      </div>
    )
  }

  _getFilter(filter) {
    return {
      filter,
      onChange: this._handleChange
    }
  }

  _handleChange(key, value) {
    this.props.onChange(key, value)
  }

}

export default Filters
