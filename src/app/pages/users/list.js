import { Page } from '../../components/page'
import React from 'react'

const UserToken = (record) => (
  <div className="user-token">
    <strong>{ record.full_name }</strong><br />
    { record.email }
  </div>
)

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Users',
  collection: {
    batchActions: [
      { label: 'Archive All', handler: (selected) => console.log('archive', selected) },
      { label: 'Delete All', handler: (selected) => console.log('delete', selected) }
    ],
    itemActions: [
      { label: 'One' },
      { label: 'Two' },
      { label: 'Three' }
    ],
    endpoint: '/api/users',
    entity: 'user',
    link: (record) => `/users/${record.id}`,
    list: {
      format: UserToken
    },
    tile: {
      format: UserToken
    },
    table: {
      columns: [
        { label: 'Name', key: 'full_name', sort: 'last_name' },
        { label: 'Email', key: 'email' }
      ]
    },
    filters: [
      { label: 'Roles', key: 'role_id', type: 'select', endpoint: '/api/roles', value: 'id', text: 'title', multiple: true }
    ],
    export: [
      { label: 'Name', key: 'full_name' },
      { label: 'Email', key: 'email' }
    ]
  },
  leftItems: [
    { label: 'Foo' }
  ],
  rightItems: [
    { label: 'Bar' }
  ]
})

export default Page(null, mapPropsToPage)
