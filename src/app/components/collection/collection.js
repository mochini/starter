import PropTypes from 'prop-types'
import React from 'react'
import Table from '../table'
import Filters from '../filters'

class Collection extends React.Component {

  static contextTypes = {}

  static propTypes = {
    filtering: PropTypes.bool,
    onToggleFilter: PropTypes.func
  }

  _handleToggleFilter = this._handleToggleFilter.bind(this)

  render() {
    const { filtering } = this.props
    return (
      <div className="collection">
        { filtering &&
          <div className="collection-filters">
            <Filters { ...this._getFilters() } />
          </div>
        }
        <div className="collection-body">
          <div className="collection-header">
            <div className="collection-tool" onClick={ this._handleToggleFilter }>
              <i className="fa fa-fw fa-filter" />
            </div>
          </div>
          <div className="collection-table">
            <Table { ...this._getTable() } />
          </div>
        </div>
      </div>
    )
  }

  _getFilters() {
    return {
      filters: [
        { label: 'Foo', key: 'foo', type: 'checkboxes', options: [{value: 0, text: 'a'},{value: 1, text: 'b'},{value: 2, text: 'c'}] },
        { label: 'Bar', key: 'bar', type: 'checkboxes', options: ['d','e','f'] },
        { label: 'Baz', key: 'baz', type: 'checkboxes', options: ['g','h','i'] }
      ]
    }
  }

  _getTable() {
    return {
      columns: [
        { label: 'One', key: 'one' },
        { label: 'Two', key: 'two' },
        { label: 'Three', key: 'three' }
      ],
      data: Array(200).fill().map((row, index) => (
        { one: `foo${index}`, two: 'bar', three: 'baz' }
      )),
      selectable: true,
      rowClass: (row) => row.one
    }
  }

  _handleToggleFilter() {
    this.props.onToggleFilter()
  }


}

export default Collection
