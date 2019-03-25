import PropTypes from 'prop-types'
import React from 'react'
import Tabs from '../components/tabs'
import Long from './long'
import Grid from './grid'

class Home extends React.Component {

  static contextTypes = {}

  static propTypes = {
    t: PropTypes.func
  }

  static defaultProps = {}

  render() {
    return (
      <Tabs { ...this._getTabs() } />
    )
  }

  _getTabs() {
    return {
      items: [
        { label: 'Foo', component: Grid },
        { label: 'Bar', component: Long }
      ]
    }
  }

}

export default Home
