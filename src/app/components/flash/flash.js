import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'

class Flash extends React.Component{

  static childContextTypes = {
    flash: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    message: PropTypes.string,
    style: PropTypes.string,
    onClear: PropTypes.func,
    onSet: PropTypes.func
  }

  state = {
    message: null,
    style: null
  }

  render() {
    const { children } = this.props
    const { message, style } = this.state
    return ([
      children,
      <CSSTransition key="flash" in={ this.props.message !== null } classNames="translatey" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className={`flash-popup ${style || ''}`}>
          <div className="flash-popup-panel">
            <div className="flash-popup-icon">
              { this._getIcon(style) }
            </div>
            <div className="flash-popup-message">
              <p>{ message }</p>
            </div>
          </div>
        </div>
      </CSSTransition>
    ])
  }

  componentDidUpdate(prevProps, prevState) {
    const { message, style, onClear } = this.props
    if(prevProps.message !== message) {
      if(message) {
        this.setState({ message, style })
        setTimeout(onClear, 2000)
      } else {
        setTimeout(() => this.setState({ message, style }), 250)
      }
    }
  }

  _getIcon(style) {
    if(style == 'success') {
      return <i className="fa fa-check-circle" />
    } else if(style == 'warning') {
      return <i className="fa fa-warning" />
    } else if(style == 'error') {
      return <i className="fa fa-times-circle" />
    } else {
      return <i className="fa fa-info-circle" />
    }
  }

  getChildContext() {
    const { onSet, onClear } = this.props
    return {
      flash: {
        set: onSet,
        clear: onClear
      }
    }
  }

}

export default Flash
