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
    filtering: PropTypes.bool,
    filters: PropTypes.array,
    filter: PropTypes.object,
    itemActions: PropTypes.array,
    layouts: PropTypes.array,
    layout: PropTypes.string,
    link: PropTypes.func,
    list: PropTypes.object,
    q: PropTypes.string,
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
    onQuery: PropTypes.func,
    onSelect: PropTypes.func,
    onSort: PropTypes.func
  }

  static defaultProps = {
    entity: 'record',
    search: true
  }

  state = {
    cacheKey: _.random(9999999999).toString(36)
  }

  _handleChangeLayout = this._handleChangeLayout.bind(this)
  _handleChangeTool = this._handleChangeTool.bind(this)
  _handleFilter = this._handleFilter.bind(this)
  _handleRefresh = this._handleRefresh.bind(this)
  _handleSelect = this._handleSelect.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { allLayouts, batchActions, search, selected, tool } = this.props
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
          <CSSTransition in={ tool !== null } classNames="opacity" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="collection-overlay" onClick={ this._handleChangeTool.bind(this, null) } />
          </CSSTransition>
          <CSSTransition in={ tool !== null } classNames="translatey" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
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
    const { filter } = this.props
    if(!_.isEqual(filter, prevProps.filter)) {
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
    const { batchActions, endpoint, filter, q } = this.props
    const sort  = this.props.sort ? [this.props.sort] : null
    return {
      cacheKey,
      endpoint,
      filter: {
        $and: [
          ...filter.$and || [],
          ...q ? [{ q: { $eq: q  } }] : []
        ]
      },
      selectable: batchActions !== undefined,
      sort,
      onSelect: this._handleSelect,
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

  _handleParseUrl() {
    const { search } = this.context.router.history.location
    const decoder = (str) => str.match(/^\d$/) !== null ? parseInt(str) : str
    const query = search.length > 0 ? qs.parse(search.slice(1), { decoder }) : {}
    const filter =  query.$filter || { $and: [] }
    this.props.onFilter(filter)
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
    this.props.onQuery(q)
  }

}

export default Collection
