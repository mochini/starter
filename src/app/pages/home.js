import ModalPanel from '../components/modal_panel'
import Collection from '../components/collection'
import PropTypes from 'prop-types'
import React from 'react'

const Token = (record) => (
  <div className="token">
    { record.one }
  </div>
)

class Home extends React.Component {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Collection { ...this._getCollection() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      leftItems: [{
        icon: 'chevron-left',
        handler: () => {}
      }],
      title: 'List',
      rightItems: [{
        icon: 'ellipsis-v',
        handler: this._handleTasks.bind(this)
      }]
    }
  }

  _getCollection() {
    return {
      itemActions: [
        { label: 'one' },
        { label: 'two' }
      ],
      data: Array(200).fill().map((row, index) => (
        { one: `foo${index}`, two: 'bar', three: 'baz' }
      )),
      list: {
        format: Token
      },
      tile: {
        format: Token
      },
      table: {
        columns: [
          { label: 'One', key: 'one' },
          { label: 'Two', key: 'two' },
          { label: 'Three', key: 'three' }
        ],
        rowClass: (row) => row.one
      },
      filters: [
        { label: 'Foo', key: 'foo', type: 'select', options: [{value: 0, text: 'a'},{value: 1, text: 'b'},{value: 2, text: 'c'}] },
        { label: 'Bar', key: 'bar', type: 'select', options: ['d','e','f'] },
        { label: 'Baz', key: 'baz', type: 'select', options: ['g','h','i'] },
        { label: 'Expires On', key: 'expires_on', type: 'daterange' },
        { label: 'Created At', key: 'created_at', type: 'daterange' }
      ],
      export: [
        { label: 'ID', key: 'id' },
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Email', key: 'email' }
      ]
    }
  }

  _handleTasks() {
    this.context.tasks.open([
      { label: 'Foo' },
      { label: 'Bar' },
      { label: 'Baz' }
    ])
  }


}

export default Home
