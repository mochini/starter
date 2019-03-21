import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Drawer extends React.Component {

  static childContextTypes = {
    drawer: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    component: PropTypes.any,
    location: PropTypes.string,
    open: PropTypes.bool,
    onClear: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }

  render() {
    const { children, component, location, open } = this.props
    return ([
      children,
      <CSSTransition key="drawer-overlay" in={ open } classNames="opacity" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="drawer-overlay" onClick={this._handleClose.bind(this)} />
      </CSSTransition>,
      <CSSTransition key="drawer-panel" in={ open } classNames="translatex" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className={`drawer-panel drawer-panel-${location}`}>
          { _.isFunction(component) ? React.createElement(component) : component }
        </div>
      </CSSTransition>
    ])
  }

  componentDidUpdate(prevProps) {
    const { open, onClear } = this.props
    if(open !== prevProps.open && !open) {
      setTimeout(onClear, 500)
    }
  }

  getChildContext() {
    return {
      drawer: {
        open: this._handleOpen.bind(this),
        close: this._handleClose.bind(this)
      }
    }
  }

  _handleOpen(component, location = 'left') {
    this.props.onOpen(component, location)
  }

  _handleClose() {
    this.props.onClose()
  }

}

export default Drawer
