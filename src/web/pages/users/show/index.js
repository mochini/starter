import { Page } from '../../../components/page'
import Info from './info'
import Access from './access'
import Edit from '../edit'
import React from 'react'

const mapResourcesToPage = (props, context, page) => ({
  user: `/api/users/${page.params.id}`,
  rights: `/api/users/${page.params.id}/rights`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'User',
  tabs: {
    items: [
      { label: 'Details', component: <Info user={ resources.user } /> },
      { label: 'Access', component: <Access rights={ resources.rights } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Edit User', modal: <Edit id={ resources.user.id } />}
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
