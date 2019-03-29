import { CSSTransition } from 'react-transition-group'
import Searchbox from '../searchbox'
import PropTypes from 'prop-types'
import Infinite from '../infinite'
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
import _ from 'lodash'
import qs from 'qs'

class Collection extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    allLayouts: PropTypes.array,
    data: PropTypes.array,
    endpoint: PropTypes.string,
    export: PropTypes.array,
    filtering: PropTypes.bool,
    filters: PropTypes.array,
    filter: PropTypes.object,
    itemActions: PropTypes.array,
    layouts: PropTypes.array,
    layout: PropTypes.string,
    q: PropTypes.string,
    selectAll: PropTypes.bool,
    selected: PropTypes.array,
    list: PropTypes.object,
    table: PropTypes.object,
    tile: PropTypes.object,
    tools: PropTypes.array,
    tool: PropTypes.string,
    onChangeLayout: PropTypes.func,
    onChangeTool: PropTypes.func,
    onFilter: PropTypes.func,
    onQuery: PropTypes.func,
    onToggle: PropTypes.func,
    onToggleAll: PropTypes.func
  }

  _handleChangeLayout = this._handleChangeLayout.bind(this)
  _handleChangeTool = this._handleChangeTool.bind(this)
  _handleFilter = this._handleFilter.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { allLayouts, selected, tool } = this.props
    return (
      <div className="collection">
        <div className="collection-header">
          <div className="collection-header-buttons">
            { allLayouts.length > 1 && <Layouts { ...this._getLayouts() } /> }
            <Tools { ...this._getTools() } />
          </div>
          <div className="collection-header-searchbox">
            <Searchbox { ...this._getSearchbox() } />
          </div>
        </div>
        <div className="collection-body">
          <div className="collection-main">
            <Infinite { ...this._getInfinite() } />
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
          { tool &&
            <div className="collection-sidebar">
              { this._getSidebarComponent() }
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { allLayouts, onChangeLayout } = this.props
    onChangeLayout(allLayouts[0].key)
    const { search } = this.context.router.history.location
    const query = search.length > 0 ? qs.parse(search.slice(1)) : {}
    this.props.onFilter(query.$filter)
  }

  componentDidUpdate(prevProps) {
    const { filter } = this.props
    if(!_.isEqual(filter, prevProps.filter)) {
      this._handleChangeUrl()
    }
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
    const { table } = this.props
    return {
      defaultValue: table.columns,
      onClose: this._handleChangeTool.bind(this, null)
    }
  }

  _getCustom() {
    const { selected, selectAll, onToggle, onToggleAll } = this.props
    return {
      selected,
      selectAll,
      onToggle,
      onToggleAll
    }
  }

  _getExport() {
    return {
      defaultValue: this.props.export,
      onClose: this._handleChangeTool.bind(this, null)
    }
  }

  _getFilters() {
    const { filters } = this.props
    return {
      label: 'Filter Records',
      filters,
      onClose: this._handleChangeTool.bind(this, null),
      onChange: this._handleFilter
    }
  }

  _getInfinite() {
    const { endpoint, q } = this.props
    const filter = { $and: [{ last_name: { $lk: q } } ] }
    const sort  = []
    return {
      endpoint,
      filter,
      sort,
      ...this._getLayout()
    }
  }

  _getSearchbox() {
    return {
      prompt: 'Search Items',
      onChange: this._handleType
    }
  }

  _getLayouts() {
    const { layout, allLayouts } = this.props
    return {
      layouts: allLayouts,
      layout,
      onChange: this._handleChangeLayout
    }
  }

  _getLayout(props) {
    const { allLayouts, layout } = this.props
    if(layout === 'table') return { layout: Table, parentProps: this._getTable() }
    if(layout === 'list') return { layout: List, parentProps: this._getList() }
    if(layout === 'tile') return { layout: Tile, parentProps: this._getTile() }
    const custom = _.find(allLayouts, { key: layout })
    if(custom) return { layout: custom.component, parentProps: this._getCustom() }
    return null
  }

  _getList() {
    const { itemActions, list, selected, selectAll, onToggle, onToggleAll } = this.props
    return {
      ...list,
      itemActions,
      selectable: true,
      selected,
      selectAll,
      onToggle,
      onToggleAll
    }
  }

  _getSidebarComponent() {
    const { tools, tool } = this.props
    if(tool === 'filter') return <Filters { ...this._getFilters() } />
    if(tool === 'columns') return <Columns { ...this._getColumns() } />
    if(tool === 'export') return <Export { ...this._getExport() } />
    const custom = _.find(tools, { key: tool })
    if(!custom) return null
    const { component } = custom
    return _.isFunction(component) ? React.createElement(component, this._getCustom()) : component
  }

  _getTable() {
    const { itemActions, selected, selectAll, table, onToggle, onToggleAll } = this.props
    return {
      ...table,
      itemActions,
      selectable: true,
      selected,
      selectAll,
      onToggle,
      onToggleAll
    }
  }

  _getTile() {
    const { itemActions, selected, selectAll, tile, onToggle, onToggleAll } = this.props
    return {
      ...tile,
      itemActions,
      selectable: true,
      selected,
      selectAll,
      onToggle,
      onToggleAll
    }
  }

  _getTools() {
    const { tools, tool } = this.props
    return {
      tool,
      tools: [
        { title: 'Filter Records', icon: 'filter', key: 'filter' },
        { title: 'Adjust Columns', icon: 'sliders', key: 'columns' },
        { title: 'Export Records', icon: 'download', key: 'export' },
        ...tools || {}
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

  _handleChangeUrl() {
    const { history } = this.context.router
    const $filter = this.props.filter
    const query = qs.stringify({ $filter }, { encode: false })
    history.replace(`${history.location.pathname}?${query}`)
  }

  _handleFilter(filter) {
    this.props.onFilter(filter)
  }

  _handleType(q) {
    this.props.onQuery(q)
  }

}

export default Collection
