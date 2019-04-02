import { Page } from '../../../components/page'
import Details from './details'
import Access from './access'
import Edit from '../edit'
import React from 'react'

const mapResourcesToPage = (props, context, page) => ({
  user: `/api/users/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'User',
  tabs: {
    items: [
      { label: 'Details', panel: <Details user={ resources.user } /> },
      { label: 'Access', panel: <Access user={ resources.user } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Edit User', modal: <Edit id={ resources.user.id } />}
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
