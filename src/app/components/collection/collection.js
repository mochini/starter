import PropTypes from 'prop-types'
import React from 'react'
import Table from '../table'
import Filters from '../filters'
import Searchbox from '../searchbox'
import Message from '../message'
import Layouts from './layouts'

class Collection extends React.Component {

  static contextTypes = {}

  static propTypes = {
    filtering: PropTypes.bool,
    filters: PropTypes.array,
    filter: PropTypes.array,
    layout: PropTypes.string,
    table: PropTypes.object,
    onChangeLayout: PropTypes.func,
    onFilter: PropTypes.func
  }

  _handleChangeLayout = this._handleChangeLayout.bind(this)
  _handleFilter = this._handleFilter.bind(this)

  render() {
    const { filters, layout } = this.props
    return (
      <div className="collection">
        { filters &&
          <div className="collection-filters">
            <Filters { ...this._getFilters() } />
          </div>
        }
        <div className="collection-body">
          <div className="collection-header">
            <div className="collection-header-bulk">
              <i className="fa fa-fw fa-chevron-down" />
            </div>
            <div className="collection-header-searchbox">
              <Searchbox { ...this._getSearchbox() } />
            </div>
            <div className="collection-header-layout">
              <Layouts { ...this._getLayouts() } />
            </div>
          </div>
          { false && <Message { ...this._getEmpty() } /> }
          { layout === 'table' &&
            <div className="collection-table">
              <Table { ...this._getTable() } />
            </div>
          }
          { layout === 'list' &&
            <div>List</div>
          }
          { layout === 'map' &&
            <div>Map</div>
          }
        </div>
      </div>
    )
  }

  _getFilters() {
    const { filters } = this.props
    return {
      label: 'Filter Results',
      filters,
      onChange: this._handleFilter
    }
  }

  _getSearchbox() {
    return {
      prompt: 'Search Items'
    }
  }

  _getEmpty() {
    return {
      icon: 'user',
      title: 'Foo Bar Baz',
      text: 'foo bar baz foo bar baz foo bar baz foo bar baz foo bar baz'
    }
  }

  _getLayouts() {
    const { layout } = this.props
    return {
      layouts: [
        { key: 'table', icon: 'table' },
        { key: 'list', icon: 'list' },
        { key: 'tile', icon: 'th' },
        { key: 'map', icon: 'map-marker' }
      ],
      layout,
      onChange: this._handleChangeLayout
    }
  }

  _getTable() {
    const { table } = this.props
    return {
      ...table
    }
  }

  _handleChangeLayout(index) {
    this.props.onChangeLayout(index)
  }

  _handleFilter(filter) {
    this.props.onFilter(filter)
  }

}

export default Collection
