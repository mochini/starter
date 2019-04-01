import { Page } from '../../components/page'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

class Details extends React.Component {

  static contextTypes = {}

  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <strong>{ user.full_name }</strong><br />
        { user.email }
      </div>
    )
  }


}

const mapResourcesToPage = (props, context, page) => ({
  user: `/api/users/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'User',
  tabs: {
    items: [
      { label: 'Details', component: <Details user={ resources.user } /> },
      { label: 'Access', component: <Details user={ resources.user } /> }
    ]
  },
  tasks: {
    items: [
      { label: 'Edit User', modal: Edit }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
