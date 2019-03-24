import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Scrollpane extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    notificationPercent: PropTypes.number,
    onReachBottom: PropTypes.func
  }

  static defaultProps = {
    notificationPercent: 30,
    onReachBottom: () => {}
  }

  notified = false

  _scrollListener = _.throttle(this._scrollListener.bind(this), 100)

  render() {
    const { children } = this.props
    return (
      <div className="scrollpane" ref={ (node) => this.scrollpane = node }>
        { children }
      </div>
    )
  }

  componentDidMount() {
    this.scrollpane.addEventListener('scroll', this._scrollListener, true)
    this.scrollpane.addEventListener('resize', this._scrollListener, true)
  }

  componentDidUpdate() {
    this.notified = false
  }

  _scrollListener() {
    const { notificationPercent, onReachBottom } = this.props
    const bottomPosition = this.scrollpane.scrollHeight - (this.scrollpane.scrollTop + this.scrollpane.offsetHeight)
    const percentRemaining = (bottomPosition / this.scrollpane.scrollHeight) * 100
    if(!this.notified && percentRemaining <= notificationPercent) {
      if(onReachBottom) onReachBottom()
      this.notified = true
    }
  }

}

export default Scrollpane
