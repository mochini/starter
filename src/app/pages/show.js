import { Page } from '../components/page'
import PropTypes from 'prop-types'
import React from 'react'

class Show extends React.Component {

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
  component: Show,
  leftItems: [
    { label: 'Foo' }
  ],
  rightItems: [
    { label: 'Bar' }
  ]
})

export default Page(mapResourcesToPage, mapPropsToPage)
