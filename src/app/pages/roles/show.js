import Assignment from '../../components/assignment'
import UserToken from '../../tokens/user_token'
import { Page } from '../../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Show extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    role: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    const { role } = this.props
    return (
      <div>
        { role.title }
      </div>
    )
  }


}

const mapResourcesToPage = (props, context, page) => ({
  role: `/api/roles/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Role',
  component: Show,
  tasks: {
    items: [
      { label: 'Assign Users', modal: <Assignment { ..._getAssignment() } />}
    ]
  }
})

const _getAssignment = () => {
  return {
    unassignedEndpoint: '/api/users',
    unassignedFormat: UserToken,
    assignedEndpoint: '/api/users',
    assignedFormat: UserToken,
    empty: {
      icon: 'user',
      title: 'No Users'
    },
    label: 'user',
    text: 'full_name',
    value: 'id'
  }
}

export default Page(mapResourcesToPage, mapPropsToPage)
