import Searchbox from '../searchbox'
import PropTypes from 'prop-types'
import Message from '../message'
import Buttons from '../buttons'
import Filters from '../filters'
import Layouts from './layouts'
import Columns from './columns'
import Table from '../table'
import Tools from './tools'
import Export from './export'
import React from 'react'
import qs from 'qs'

class Collection extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    filtering: PropTypes.bool,
    filters: PropTypes.array,
    filter: PropTypes.object,
    layout: PropTypes.string,
    table: PropTypes.object,
    tool: PropTypes.string,
    onChangeLayout: PropTypes.func,
    onChangeTool: PropTypes.func,
    onFilter: PropTypes.func
  }

  _handleChangeLayout = this._handleChangeLayout.bind(this)
  _handleChangeTool = this._handleChangeTool.bind(this)
  _handleFilter = this._handleFilter.bind(this)

  render() {
    const { layout, tool } = this.props
    return (
      <div className="collection">
        { tool &&
          <div className="collection-sidebar">
            { tool === 'filter' && <Filters { ...this._getFilters() } /> }
            { tool === 'columns' && <Columns { ...this._getColumns() } /> }
            { tool === 'export' && <Export { ...this._getExport() } /> }
          </div>
        }
        <div className="collection-main">
          <div className="collection-header">
            <div className="collection-header-searchbox">
              <Searchbox { ...this._getSearchbox() } />
            </div>
            <div className="collection-header-layout">
              <Layouts { ...this._getLayouts() } />
            </div>
            <div className="collection-header-layout">
              <Tools { ...this._getTools() } />
            </div>
          </div>
          <div className="collection-body">
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
          <div className="collection-footer">
            <div className="collection-footer-icon">
              <i className="fa fa-fw fa-chevron-up" />
            </div>
            <div className="collection-footer-text">
              With 10 selected:
            </div>
            <div className="collection-footer-buttons">
              <Buttons { ...this._getButtons() } />
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { search } = this.context.router.history.location
    const $filters = search.length > 0 ? qs.parse(search.slice(1)) : {}
  }

  _getButtons() {
    return {
      buttons: [
        { label: 'Submit All', color: 'green' },
        { label: 'Delete All', color: 'red' }
      ]
    }
  }

  _getColumns() {
    return {}
  }

  _getExport() {
    return {}
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

  _getTools() {
    const { tool } = this.props
    return {
      tool,
      tools: [
        { title: 'Filter Records', icon: 'filter', key: 'filter' },
        { title: 'Adjust Columns', icon: 'sliders', key: 'columns' },
        { title: 'Export Records', icon: 'download', key: 'export' }
      ],
      onChangeTool: this._handleChangeTool
    }
  }

  _handleChangeLayout(index) {
    this.props.onChangeLayout(index)
  }

  _handleChangeTool(tool) {
    this.props.onChangeTool(tool)
  }

  _handleFilter(filter) {
    this.props.onFilter(filter)
  }

}

export default Collection
