import PropTypes from 'prop-types'
import React from 'react'

import Select from './select'

class Filter extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.any,
    filter: PropTypes.object,
    onBack: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    const { filter } = this.props
    return (
      <div className="filter-panel">
        <div className="filter-panel-header" onClick={ this._handleBack }>
          <div className="filter-panel-header-nav">
            <i className="fa fa-fw fa-chevron-left" />
          </div>
          <div className="filter-panel-header-label">
            { filter.label }
          </div>
          <div className="filter-panel-header-nav" />
        </div>
        <div className="filter-panel-body">
          { filter.type === 'select' &&
            <Select { ...this._getSelect() }/>
          }
        </div>
      </div>
    )
  }

  _getSelect() {
    const { defaultValue, filter } = this.props
    return {
      defaultValue,
      ...filter,
      onChange: this._handleChange
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(value) {
    const { filter } = this.props
    this.props.onChange(filter.key, value)
  }

}

export default Filter
