import { CSSTransition } from 'react-transition-group'
import Searchbox from '../searchbox'
import PropTypes from 'prop-types'
import Message from '../message'
import Buttons from '../buttons'
import Filters from './filters'
import Layouts from './layouts'
import Columns from './columns'
import Export from './export'
import Table from './table'
import Tools from './tools'
import List from './list'
import Tile from './tile'
import React from 'react'
import qs from 'qs'

class Collection extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    data: PropTypes.array,
    filtering: PropTypes.bool,
    filters: PropTypes.array,
    filter: PropTypes.object,
    layouts: PropTypes.array,
    layout: PropTypes.string,
    selectAll: PropTypes.bool,
    selected: PropTypes.array,
    list: PropTypes.object,
    table: PropTypes.object,
    tile: PropTypes.object,
    tool: PropTypes.string,
    onChangeLayout: PropTypes.func,
    onChangeTool: PropTypes.func,
    onFilter: PropTypes.func,
    onToggle: PropTypes.func,
    onToggleAll: PropTypes.func
  }

  _handleChangeLayout = this._handleChangeLayout.bind(this)
  _handleChangeTool = this._handleChangeTool.bind(this)
  _handleFilter = this._handleFilter.bind(this)

  render() {
    const { layouts, layout, selected, tool } = this.props
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
            { layouts.length > 1 &&
              <div className="collection-header-layout">
                <Layouts { ...this._getLayouts() } />
              </div>
            }
            <div className="collection-header-layout">
              <Tools { ...this._getTools() } />
            </div>
          </div>
          <div className="collection-body">
            { false && <Message { ...this._getEmpty() } /> }
            { layout === 'table' && <Table { ...this._getTable() } /> }
            { layout === 'list' && <List { ...this._getList() } /> }
            { layout === 'tile' && <Tile { ...this._getTile() } /> }
            { layout === 'map' && <div>Map</div> }
          </div>
          <CSSTransition key="drawer-panel" in={ selected.length > 0 } classNames="translatey" timeout={ 100 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="collection-footer">
              <div className="collection-footer-count">
                <i className="fa fa-fw fa-chevron-up" />
                <div className="count">
                  { selected.length }
                </div>
              </div>
              <div className="collection-footer-buttons">
                <Buttons { ...this._getButtons() } />
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { layouts, onChangeLayout } = this.props
    onChangeLayout(layouts[0].key)
    const { search } = this.context.router.history.location
    const $filters = search.length > 0 ? qs.parse(search.slice(1)) : {}
    console.log($filters)
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
      label: 'Filter Records',
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
    const { layout, layouts } = this.props
    return {
      layouts,
      layout,
      onChange: this._handleChangeLayout
    }
  }

  _getList() {
    const { data, list, selected, selectAll, onToggle, onToggleAll } = this.props
    return {
      ...list,
      data,
      selected,
      selectAll,
      onToggle,
      onToggleAll
    }
  }

  _getTable() {
    const { data, selected, selectAll, table, onToggle, onToggleAll } = this.props
    return {
      ...table,
      data,
      selected,
      selectAll,
      onToggle,
      onToggleAll
    }
  }

  _getTile() {
    const { data, selected, selectAll, tile, onToggle, onToggleAll } = this.props
    return {
      ...tile,
      data,
      selected,
      selectAll,
      onToggle,
      onToggleAll
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
