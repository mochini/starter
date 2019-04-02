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
    batchActions: PropTypes.array,
    data: PropTypes.array,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    export: PropTypes.array,
    filters: PropTypes.array,
    filter: PropTypes.object,
    itemActions: PropTypes.array,
    layouts: PropTypes.array,
    layout: PropTypes.string,
    link: PropTypes.func,
    list: PropTypes.object,
    selected: PropTypes.array,
    search: PropTypes.bool,
    sort: PropTypes.object,
    table: PropTypes.object,
    tile: PropTypes.object,
    tools: PropTypes.array,
    tool: PropTypes.string,
    onChangeLayout: PropTypes.func,
    onChangeTool: PropTypes.func,
    onFilter: PropTypes.func,
    onSelect: PropTypes.func,
    onSort: PropTypes.func
  }

  static defaultProps = {
    entity: 'record',
    search: true
  }

  state = {
    cacheKey: _.random(9999999999).toString(36),
    panel: false
  }

  _handleChangeLayout = this._handleChangeLayout.bind(this)
  _handleChangeTool = this._handleChangeTool.bind(this)
  _handleFilter = this._handleFilter.bind(this)
  _handleRefresh = this._handleRefresh.bind(this)
  _handleSelect = this._handleSelect.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { panel } = this.state
    const { allLayouts, batchActions, filter, search, selected, tool } = this.props
    if(!filter.$and) return null
    return (
      <div className="collection">
        <div className="collection-header">
          <div className="collection-header-buttons">
            { allLayouts.length > 1 && <Layouts { ...this._getLayouts() } /> }
            <Tools { ...this._getTools() } />
            <div className="collection-header-tools">
              <div className="collection-tools">
                <div className="collection-tool" tooltip="Refresh Data" onClick={ this._handleRefresh }>
                  <i className="fa fa-fw fa-refresh" />
                </div>
              </div>
            </div>
          </div>
          <div className="collection-header-searchbox">
            { search && <Searchbox { ...this._getSearchbox() } /> }
          </div>
        </div>
        <div className="collection-body">
          <div className="collection-main">
            <Infinite { ...this._getInfinite() } />
            { batchActions &&
              <CSSTransition in={ selected.length > 0 } classNames="translatey" timeout={ 100 } mountOnEnter={ true } unmountOnExit={ true }>
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
            }
          </div>
          <CSSTransition in={ panel } classNames="opacity" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="collection-overlay" onClick={ this._handleChangeTool.bind(this, null) } />
          </CSSTransition>
          <CSSTransition in={ panel } classNames="translatey" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="collection-sidebar">
              { this._getSidebarComponent() }
            </div>
          </CSSTransition>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { allLayouts, onChangeLayout } = this.props
    onChangeLayout(allLayouts[0].key)
    this._handleParseUrl()
  }

  componentDidUpdate(prevProps) {
    const { filter, sort } = this.props
    if(!_.isEqual(filter, prevProps.filter) || !_.isEqual(sort, prevProps.sort)) {
      this._handleChangeUrl()
    }
  }

  _getButtons() {
    const { batchActions, selected } = this.props
    return {
      buttons: batchActions.map(action => ({
        ...action,
        color: 'red',
        handler: () => action.handler(selected)
      }))
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
    const { link } = this.props
    return {
      link
    }
  }

  _getExport() {
    const { endpoint, entity, filter, sort } = this.props
    return {
      defaultValue: this.props.export,
      endpoint,
      entity,
      filter,
      sort,
      onClose: this._handleChangeTool.bind(this, null)
    }
  }

  _getFilters() {
    const { filter, filters } = this.props
    return {
      defaultValue: filter,
      label: 'Filter Records',
      filters,
      onClose: this._handleChangeTool.bind(this, null),
      onChange: this._handleFilter
    }
  }

  _getInfinite() {
    const { cacheKey } = this.state
    const { batchActions, endpoint, filter } = this.props
    return {
      cacheKey,
      endpoint,
      filter,
      selectable: batchActions !== undefined,
      sort: this.props.sort,
      onSelect: this._handleSelect,
      ...this._getLayout()
    }
  }

  _getSearchbox() {
    const { filter } = this.props
    const query = filter.$and ? filter.$and.find(item => Object.keys(item)[0] === 'q') : null
    return {
      prompt: 'Search Items',
      defaultValue: query ? query.q.$eq : null,
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
    const { itemActions, link, list } = this.props
    return {
      ...list,
      itemActions,
      link
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
    const { itemActions, link, table, onSort } = this.props
    return {
      ...table,
      itemActions,
      link,
      onSort
    }
  }

  _getTile() {
    const { itemActions, link, tile } = this.props
    return {
      ...tile,
      itemActions,
      link
    }
  }

  _getTools() {
    const { filters, table, tool } = this.props
    const tools = []
    if(filters) tools.push({ title: 'Filter Records', icon: 'filter', key: 'filter' })
    if(table) tools.push({ title: 'Adjust Columns', icon: 'sliders', key: 'columns' })
    if(this.props.export) tools.push({ title: 'Export Records', icon: 'download', key: 'export' })
    return {
      tool,
      tools: [
        ...tools,
        ...this.props.tools || []
      ],
      onChangeTool: this._handleChangeTool
    }
  }

  _handleChangeLayout(index) {
    this.props.onChangeLayout(index)
  }

  _handleChangeTool(tool) {
    const { onChangeTool } = this.props
    const panel = tool !== null && tool !== this.props.tool
    this.setState({ panel })
    const duration = panel ? 0 : 250
    setTimeout(() => onChangeTool(tool), duration)
  }

  _handleChangeUrl() {
    const { history } = this.context.router
    const $filter = this.props.filter
    const $sort = this.props.sort
    const query = qs.stringify({ $filter, $sort }, { encode: false, skipNulls: true })
    history.replace(`${history.location.pathname}?${query}`)
  }

  _handleFilter(filter) {
    this.props.onFilter(filter)
  }

  _handleParseUrl() {
    const { search } = this.context.router.history.location
    const decoder = (str) => str.match(/^\d$/) !== null ? parseInt(str) : str
    const query = search.length > 0 ? qs.parse(search.slice(1), { decoder }) : {}
    const filter =  query.$filter || { $and: [] }
    this.props.onFilter(filter)
    if(query.$sort) this.props.onSort(query.$sort.column, query.$sort.order)

  }

  _handleRefresh() {
    this.setState({
      cacheKey: _.random(9999999999).toString(36)
    })
  }

  _handleSelect(selected) {
    this.props.onSelect(selected)
  }

  _handleType(q) {
    const { $and } = this.props.filter
    const filter = {
      $and: [
        ...$and.filter(filter => Object.keys(filter)[0] !== 'q'),
        q.length > 0 ? { q: { $eq: q } } : {}
      ]
    }
    this.props.onFilter(filter)
  }

}

export default Collection
