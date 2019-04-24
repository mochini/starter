import { Page } from '../../components/page'
import React from 'react'
import Edit from './edit'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Roles',
  collection: {
    itemActions: [
      { label: 'Edit', modal: (record) => <Edit id={ record.id } /> }
    ],
    endpoint: '/api/roles',
    entity: 'role',
    link: (record) => `/roles/${record.id}`,
    table: {
      columns: [
        { label: 'Title', key: 'title' }
      ]
    }
  },
  task: { label: 'New Role', modal: New }
})

export default Page(null, mapPropsToPage)
