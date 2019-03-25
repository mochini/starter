import PropTypes from 'prop-types'
import React from 'react'
import Collection from '../components/collection'

class Long extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <Collection { ...this._getCollection() } />
    )
  }

  _getCollection() {
    return {
      table: {
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
      },
      filters: [
        { label: 'Foo', key: 'foo', type: 'select', options: [{value: 0, text: 'a'},{value: 1, text: 'b'},{value: 2, text: 'c'}] },
        { label: 'Bar', key: 'bar', type: 'select', options: ['d','e','f'] },
        { label: 'Baz', key: 'baz', type: 'select', options: ['g','h','i'] }
      ]
    }
  }


}

export default Long
