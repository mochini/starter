import ModalPanel from '../components/modal_panel'
import Collection from '../components/collection'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

const Token = (record) => (
  <div className="token">
    <strong>{ record.full_name }</strong><br />
    { record.email }
  </div>
)

class Home extends React.PureComponent {

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
        { label: 'Edit', modal: New },
        { label: 'Bar', handler: () => console.log('bar') },
        { label: 'Baz', handler: () => console.log('baz') }
      ],
      endpoint: '/api/users',
      list: {
        format: Token
      },
      tile: {
        format: Token
      },
      table: {
        columns: [
          { label: 'ID', key: 'id' },
          { label: 'Name', key: 'full_name' },
          { label: 'Email', key: 'email' }
        ]
      },
      filters: [],
      export: [
        { label: 'ID', key: 'id' },
        { label: 'Name', key: 'full_name' },
        { label: 'Email', key: 'email' }
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
