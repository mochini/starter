import Details from '../../../components/details'
import PropTypes from 'prop-types'
import React from 'react'

class Info extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {
  }

  render() {
    return <Details { ...this._getDetails() } />
  }

  _getDetails() {
    const { user } = this.props
    return {
      items: [
        { label: 'Name', value: user.full_name },
        { label: 'Email', value: user.email },
        { label: 'Roles', value: user.roles.map(role => role.title).join(', ') }
      ]
    }
  }


}

export default Info
