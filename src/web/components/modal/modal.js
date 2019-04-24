import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Modal extends React.PureComponent {

  static childContextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    panel: PropTypes.any,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }

  state = {
    panel: null
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    const { panel } = this.state
    const { children } = this.props
    return (
      <div className="modal">
        { children }
        <CSSTransition key="modal-overlay" in={ this.props.panel !== null } classNames="opacity" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="modal-overlay" onClick={ this._handleClose } />
        </CSSTransition>
        <CSSTransition key="modal-window" in={ this.props.panel !== null } classNames="translatey" timeout={ 500 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="modal-window">
            <div className="modal-window-container">
              <div className="modal-window-panel">
                { _.isFunction(panel) ? React.createElement(panel) : panel }
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { panel } = this.props
    if(panel !== prevProps.panel) {
      const timeout = prevProps.panel ? 500 : 0
      setTimeout(() => this.setState({ panel }), timeout)
    }
  }

  getChildContext() {
    return {
      modal: {
        close: this._handleClose.bind(this),
        open: this._handleOpen.bind(this)
      }
    }
  }

  _handleClose() {
    this.props.onClose()
  }

  _handleOpen(component) {
    this.props.onOpen(component)
  }

}

export default Modal
