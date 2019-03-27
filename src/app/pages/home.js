import ModalPanel from '../components/modal_panel'
import Collection from '../components/collection'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

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
        { label: 'One', key: 'one', type: 'select', options: [{value: 0, text: 'a'},{value: 1, text: 'b'},{value: 2, text: 'c'}] },
        { label: 'Two', key: 'two', type: 'select', options: ['d','e','f'] },
        { label: 'Three', key: 'three', type: 'daterange' }
      ],
      export: [
        { label: 'One', key: 'one' },
        { label: 'Two', key: 'two' },
        { label: 'Three', key: 'three' }
      ]
    }
  }

  _handleTasks() {
    this.context.tasks.open([
      { label: 'Foo', modal: New },
      { label: 'Bar', handler: () => console.log('bar') },
      { label: 'Baz', handler: () => console.log('baz') }
    ])
  }


}

export default Home
