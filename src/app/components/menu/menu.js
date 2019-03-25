import PropTypes from 'prop-types'
import Panel from './panel'
import React from 'react'

class Menu extends React.Component {

  static contextTypes = {
    drawer: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    items: PropTypes.array,
    path: PropTypes.array,
    onBack: PropTypes.func,
    onForward: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleForward = this._handleForward.bind(this)

  render() {
    return (
      <div className="menu">
        <Panel { ...this._getPanel() } />
      </div>
    )
  }

  _getItems(items, path) {
    return path.reduce((items, index) => items.items[index], { items })
  }

  _getPanel() {
    const { items, path } = this.props
    return {
      path,
      ...this._getItems(items, path),
      onBack: this._handleBack,
      onForward: this._handleForward
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleForward(index) {
    this.props.onForward(index)
  }

}

export default Menu
