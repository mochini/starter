import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'

class NotFound extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div>
        <Helmet>
          <title>Not Found | Static Starter</title>
        </Helmet>
        Page Not Found
      </div>
    )
  }

}

export default NotFound
