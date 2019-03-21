import PropTypes from 'prop-types'
import React from 'react'

class Home extends React.Component {

  static contextTypes = {}

  static propTypes = {
    t: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <div>
        Home
      </div>
    )
  }

}

export default Home
