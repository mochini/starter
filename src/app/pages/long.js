import PropTypes from 'prop-types'
import React from 'react'
import Scrollpane from '../components/scrollpane'

class Long extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <Scrollpane { ...this._getScrollpane() }>
        { Array(100).fill().map((n, index) => (
          <p key={`foo_${index}`}>Lorem ipsum dolor amet mlkshk blue bottle kale chips, try-hard vice fanny pack yr sustainable cliche street art biodiesel seitan enamel pin church-key meggings. Marfa chambray pabst pitchfork hexagon, knausgaard vinyl pok pok helvetica shoreditch edison bulb.</p>
        ))}
      </Scrollpane>
    )
  }

  _getScrollpane() {
    return {
      onReachBottom: () => {
        console.log('reached')
      }
    }
  }


}

export default Long
