import Scrollpane from '../scrollpane'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Table extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    rowClass: PropTypes.func,
    selectAll: PropTypes.bool,
    selected: PropTypes.array,
    selectable: PropTypes.bool,
    sortColumn: PropTypes.number,
    sortOrder: PropTypes.string,
    onReachBottom: PropTypes.func,
    onSelect: PropTypes.func,
    onToggle: PropTypes.func,
    onToggleAll: PropTypes.func
  }

  static defaultProps = {
    selectable: false,
    onReachBottom: () => {},
    onSelect: () => {}
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
    const { columns, data, selectable, selectAll, selected, sortColumn, sortOrder } = this.props
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
                  <th key={`column_${index}`} { ...this._getHeader(index + (selectable ? 1 : 0 )) } onClick={ this._handleSort.bind(this, index)}>
                    { columns[index].label }
                    { sortColumn === index &&
                      (sortOrder === 'asc' ?
                        <i className="fa fa-fw fa-chevron-up" /> :
                        <i className="fa fa-fw fa-chevron-down" />
                      )
                    }
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        <div className="table-body">
          <Scrollpane { ...this._getScrollpane() }>
            <table ref={ (node) => this.body = node }>
              <tbody>
                { data.map((row, index) => (
                  <tr className={ this._getRowClass(index) } key={`foo_${index}`}>
                    { selectable &&
                      <td onClick={ this._handleToggle.bind(this, index) }>
                        { _.includes(selected, index) ?
                          <i className="fa fa-fw fa-check-circle" /> :
                          <i className="fa fa-fw fa-circle-o" />
                        }
                      </td>
                    }
                    { columns.map((column, index) => (
                      <td key={`column_${index}`}>
                        { row[columns[index].key] }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Scrollpane>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleResize()
    window.addEventListener('resize', this._handleResize, true)
  }

  componentDidUpdate(prevProps) {
    const { data, selected, selectAll } = this.props
    if(data.length !== prevProps.data.length) {
      this._handleResize()
    } else if(selectAll !== prevProps.selectAll) {
      this._handleSelect()
    } else if(selected.length !== prevProps.selected.length) {
      this._handleSelect()
    }

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize, true)
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
    const { data, rowClass, selected } = this.props
    const classes = []
    if(rowClass) classes.push(rowClass(data[index]))
    if(_.includes(selected, index)) classes.push('selected')
    return classes.join(' ')
  }

  _getScrollpane() {
    return {
      onReachBottom: this.props.onReachBottom
    }
  }

  _handleResize() {
    const row = this.body.children[0].children[0]
    const widths = Array.prototype.map.call(row.children, child => child.offsetWidth)
    this.setState({ widths })
  }

  _handleSelect() {
    const { data, selected, onSelect } = this.props
    onSelect(data.filter((row, index) => _.includes(selected, index)))
  }

  _handleSort(index) {
    this.props.onSort(index)
  }

  _handleToggle(index) {
    this.props.onToggle(index)
  }

  _handleToggleAll() {
    const { data } = this.props
    this.props.onToggleAll(data.length)
  }

}

export default Table