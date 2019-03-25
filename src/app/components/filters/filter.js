import PropTypes from 'prop-types'
import React from 'react'

import Checkboxes from './checkboxes'

class Filter extends React.Component {

  static contextTypes = {}

  static propTypes = {
    filter: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    const { filter } = this.props
    return (
      <div className="filter">
        { filter.label }
        { filter.type === 'checkboxes' &&
          <Checkboxes { ...filter } onChange={ this._handleChange } />
        }
      </div>
    )
  }

  _handleChange(value) {
    const { filter } = this.props
    this.props.onChange(filter.key, value)
  }

}

export default Filter
