import PropTypes from 'prop-types'
import Button from '../button'
import React from 'react'

class Items extends React.Component {

  static contextTypes = {}

  static propTypes = {
    data: PropTypes.object,
    filters: PropTypes.array,
    label: PropTypes.string,
    onSelect: PropTypes.func,
    onReset: PropTypes.func
  }

  static defaultProps = {}

  _handleReset = this._handleReset.bind(this)

  render() {
    const { data, filters, label } = this.props
    return (
      <div className="filter-panel">
        <div className="filter-panel-header">
          <div className="filter-panel-header-label">
            { label }
          </div>
        </div>
        <div className="filter-panel-body">
          <div className="filter-items">
            { filters.map((filter, index) => (
              <div className="filter-item "key={`filter_${index}`} onClick={ this._handleSelect.bind(this, index) }>
                <div className="filter-item-label">
                  { filter.label }
                </div>
                <div className="filter-item-count">
                  { data[filter.key] && data[filter.key].length > 0 &&
                    <div className="count">
                      { data[filter.key].length }
                    </div>
                  }
                </div>
                <div className="filter-item-icon">
                  <i className="fa fa-fw fa-chevron-right" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="filter-panel-footer">
          <Button { ...this._getButton() } />
        </div>
      </div>
    )
  }

  _getButton() {
    return {
      label: 'Reset Filters',
      color: 'red',
      handler: this._handleReset
    }
  }

  _handleReset() {
    this.props.onReset()
  }

  _handleSelect(index) {
    this.props.onSelect(index)
  }

}

export default Items
