import PropTypes from 'prop-types'
import React from 'react'

class Details extends React.PureComponent {

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

export default Details
