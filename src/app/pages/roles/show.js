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
  component: Show
})

export default Page(mapResourcesToPage, mapPropsToPage)
