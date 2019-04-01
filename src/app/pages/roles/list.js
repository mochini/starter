import { Page } from '../../components/page'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Roles',
  collection: {
    itemActions: [
      { label: 'Edit' }
    ],
    endpoint: '/api/roles',
    entity: 'role',
    link: (record) => `/roles/${record.id}`,
    table: {
      columns: [
        { label: 'Title', key: 'title' }
      ]
    }
  }
})

export default Page(null, mapPropsToPage)
