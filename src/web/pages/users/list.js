import UserToken from '../../tokens/user_token'
import { Page } from '../../components/page'
import React from 'react'
import Edit from './edit'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Users',
  collection: {
    batchActions: [
      { label: 'Archive All', handler: (selected) => console.log('archive', selected) },
      { label: 'Delete All', handler: (selected) => console.log('delete', selected) }
    ],
    itemActions: [
      { label: 'Edit User', modal: (record) => <Edit id={ record.id } /> }
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
        { label: 'Name', key: 'full_name', sort: 'last_name', format: UserToken }
      ]
    },
    filters: [
      { label: 'Roles', key: 'role_id', type: 'select', endpoint: '/api/roles', value: 'id', text: 'title', multiple: true },
      { label: 'Created', key: 'created_at', type: 'daterange' }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Name', key: 'full_name' },
      { label: 'Email', key: 'email' }
    ]
  },
  task: { label: 'New User', modal: New }
})

export default Page(null, mapPropsToPage)
