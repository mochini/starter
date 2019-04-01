import Actions from '../actions/index'
import PropTypes from 'prop-types'
import Format from '../../format'
import React from 'react'
import _ from 'lodash'

class Table extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    columns: PropTypes.array,
    itemActions: PropTypes.array,
    link: PropTypes.func,
    records: PropTypes.array,
    rowClass: PropTypes.func,
    selectAll: PropTypes.bool,
    selected: PropTypes.array,
    selectable: PropTypes.bool,
    sortColumn: PropTypes.number,
    sortOrder: PropTypes.string,
    onReachBottom: PropTypes.func,
    onSelect: PropTypes.func,
    onSort: PropTypes.func,
    onSortColumn: PropTypes.func,
    onToggle: PropTypes.func,
    onToggleAll: PropTypes.func
  }

  static defaultProps = {
    onReachBottom: () => {},
    onSelect: () => {},
    onSort: () => {}
  }

  body = null
  head = null
  table = null

  state = {
    selected: [],
    widths: []
  }

  _handleResize = this._handleResize.bind(this)
  _handleToggleAll = this._handleToggleAll.bind(this)

  render() {
    const { columns, itemActions, records, selectable, selectAll, selected, sortColumn, sortOrder } = this.props
    return (
      <div className={ this._getClass() } ref={ (node) => this.table = node }>
        <div className="table-head">
          <table ref={ (node) => this.head = node }>
            <thead>
              <tr>
                { selectable &&
                  <th onClick={ this._handleToggleAll } { ...this._getHeader(0) }>
                    { selectAll ?
                      <i className="fa fa-fw fa-check-circle" /> :
                      <i className="fa fa-fw fa-circle-o" />
                    }
                  </th>
                }
                { columns.map((column, index) => (
                  <th key={`column_${index}`} { ...this._getHeader(index + (selectable ? 1 : 0 )) } onClick={ this._handleSortColumn.bind(this, index)}>
                    { columns[index].label }
                    { sortColumn === index &&
                      (sortOrder === 'asc' ?
                        <i className="fa fa-fw fa-chevron-up" /> :
                        <i className="fa fa-fw fa-chevron-down" />
                      )
                    }
                  </th>
                ))}
                { itemActions && itemActions.length > 0 &&
                  <th { ...this._getHeader(columns.length + (selectable ? 1 : 0 )) } />
                }
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-body">
          <table ref={ (node) => this.body = node }>
            <tbody>
              { records.map((record, index) => (
                <tr className={ this._getRowClass(index) } key={`foo_${index}`} onClick={ this._handleClick.bind(this, record) }>
                  { selectable &&
                    <td onClick={ this._handleToggle.bind(this, index) } className="collapsing table-cell">
                      { _.includes(selected, index) ?
                        <i className="fa fa-fw fa-check-circle" /> :
                        <i className="fa fa-fw fa-circle-o" />
                      }
                    </td>
                  }
                  { columns.map((column, index) => (
                    <td key={`column_${index}`}>
                      { column.format ?
                        <Format { ...record } format={ column.format } value={ _.get(record, column.key) } /> :
                        <div className="table-cell">
                          { _.get(record, column.key) }
                        </div>
                      }
                    </td>
                  ))}
                  { itemActions && itemActions.length > 0 &&
                    <td className="collapsing table-actions">
                      <Actions { ...this._getActions(record) } />
                    </td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleResize()
    window.addEventListener('resize', this._handleResize, true)
  }

  componentDidUpdate(prevProps) {
    const { records, selected, selectAll, sortColumn, sortOrder } = this.props
    if(records.length !== prevProps.records.length) {
      this._handleResize()
    } else if(selectAll !== prevProps.selectAll) {
      this._handleSelect()
    } else if(selected.length !== prevProps.selected.length) {
      this._handleSelect()
    } else if(sortColumn !== prevProps.sortColumn) {
      this._handleSort()
    } else if(sortOrder !== prevProps.sortOrder) {
      this._handleSort()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize, true)
  }

  _getActions(record) {
    const { itemActions } = this.props
    return {
      record,
      items: itemActions
    }
  }

  _getClass() {
    const { selectable } = this.props
    const classes = ['table']
    if(selectable) classes.push('selectable')
    return classes.join(' ')
  }

  _getHeader(index) {
    const { widths } = this.state
    if(!widths[index]) return {}
    const style = { width: widths[index] }
    return { style }
  }

  _getRowClass(index) {
    const { records, rowClass, selected } = this.props
    const classes = []
    if(rowClass) classes.push(rowClass(records[index]))
    if(_.includes(selected, index)) classes.push('selected')
    return classes.join(' ')
  }

  _getScrollpane() {
    return {
      onReachBottom: this.props.onReachBottom
    }
  }

  _handleClick(record) {
    const { history } = this.context.router
    const { link } = this.props
    if(link) history.push(link(record))
  }

  _handleResize() {
    const row = this.body.children[0].children[0]
    const widths = Array.prototype.map.call(row.children, child => child.offsetWidth)
    this.setState({ widths })
  }

  _handleSelect() {
    const { records, selected, onSelect } = this.props
    onSelect(records.filter((row, index) => _.includes(selected, index)))
  }

  _handleSort() {
    const { columns, sortOrder } = this.props
    const column = columns[this.props.sortColumn]
    const key = column.sort || column.key
    this.props.onSort(key, sortOrder)
  }

  _handleSortColumn(index) {
    this.props.onSortColumn(index)
  }

  _handleToggle(index, e) {
    e.stopPropagation()
    this.props.onToggle(index)
  }

  _handleToggleAll() {
    const { records } = this.props
    this.props.onToggleAll(records.length)
  }

}

export default Table
