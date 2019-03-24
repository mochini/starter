import PropTypes from 'prop-types'
import React from 'react'
import Table from '../components/table'

class Long extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <Table { ...this._getTable()} />
    )
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


}

export default Long
