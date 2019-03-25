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
      data: Array(200).fill().map((row, index) => (
        { one: `foo${index}`, two: 'bar', three: 'baz' }
      )),
      table: {
        columns: [
          { label: 'One', key: 'one' },
          { label: 'Two', key: 'two' },
          { label: 'Three', key: 'three' }
        ],
        selectable: true,
        rowClass: (row) => row.one
      },
      filters: [
        { label: 'Foo', key: 'foo', type: 'select', options: [{value: 0, text: 'a'},{value: 1, text: 'b'},{value: 2, text: 'c'}] },
        { label: 'Bar', key: 'bar', type: 'select', options: ['d','e','f'] },
        { label: 'Baz', key: 'baz', type: 'select', options: ['g','h','i'] },
        { label: 'Expires On', key: 'expires_on', type: 'daterange' },
        { label: 'Created At', key: 'created_at', type: 'daterange' }
      ]
    }
  }


}

export default Long
