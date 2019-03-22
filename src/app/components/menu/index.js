import PropTypes from 'prop-types'
import React from 'react'

class Menu extends React.Component {

  static contextTypes = {
    drawer: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <div className="menu">
        <div className="menu-item" onClick={ this._handleClick.bind(this, '/page1') }>
          Item 1
        </div>
        <div className="menu-item" onClick={ this._handleClick.bind(this, '/page2') }>
          Item 2
        </div>
        <div className="menu-item" onClick={ this._handleClick.bind(this, '/page3') }>
          Item 3
        </div>
        <div className="menu-item" onClick={ this._handleClick.bind(this, '/page4') }>
          Item 4
        </div>
      </div>
    )
  }

  _handleClick(route) {
    this.context.drawer.close()
    this.context.router.history.push(route)
  }

}

export default Menu
