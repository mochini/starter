import { Page } from '../components/page'
import PropTypes from 'prop-types'
import React from 'react'

const Token = (record) => (
  <div className="token">
    <strong>{ record.full_name }</strong><br />
    { record.email }
  </div>
)

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Users',
  collection: {
    itemActions: [
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
    filters: [
      { label: 'Users', key: 'user_id', type: 'select', endpoint: '/api/users', value: 'id', text: 'full_name' }
    ],
    export: [
      { label: 'ID', key: 'id' },
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
