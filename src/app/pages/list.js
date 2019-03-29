import { Page } from '../components/page'
import PropTypes from 'prop-types'
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
      { label: 'Archive All', handler: (selected) => console.log(`archive ${selected}`) },
      { label: 'Delete All', handler: (selected) => console.log(`delete ${selected}`) }
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
      { label: 'Users', key: 'id', type: 'select', endpoint: '/api/users', value: 'id', text: 'full_name', multiple: true, format: UserToken },
      { label: 'Created At', key: 'created_at', type: 'daterange' }
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
