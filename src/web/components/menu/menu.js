import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Panel from './panel'
import React from 'react'

class Menu extends React.PureComponent {

  static contextTypes = {
    drawer: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    classNames: PropTypes.string,
    items: PropTypes.array,
    path: PropTypes.array,
    onBack: PropTypes.func,
    onForward: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)
  _handleForward = this._handleForward.bind(this)

  render() {
    const { path, classNames } = this.props
    return (
      <div className={`menu ${classNames}`}>
        <TransitionGroup>
          <CSSTransition key={`panel_${path.length}`} classNames="translatex" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
            <Panel { ...this._getPanel() } />
          </CSSTransition>
        </TransitionGroup>
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
