import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Button from '../button'
import React from 'react'

class Tasks extends React.Component {

  static childContextTypes = {
    tasks: PropTypes.object
  }

  static contextTypes = {}

  static propTypes = {
    children: PropTypes.any,
    items: PropTypes.array,
    open: PropTypes.bool,
    onClear: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    const { children, items, open } = this.props
    return ([
      children,
      <CSSTransition key="tasks-overlay" in={ open } classNames="opacity" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="tasks-overlay" onClick={ this._handleClose } />
      </CSSTransition>,
      <CSSTransition key="tasks-list" in={ open } classNames="translatey" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="tasks-list">
          <div className="tasks-list-body">
            { items && items.map((item, index) => {
              if(item.show === false) return
              return <Button key={`task_${index}`} { ...this._getButton(item) }/>
            }) }
          </div>
          <div className="tasks-cancel" onClick={ this._handleClose }>
            Cancel
          </div>
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
    const { onOpen, onClose } = this.props
    return {
      tasks: {
        open: onOpen,
        close: onClose
      }
    }
  }

  _getButton(item){
    return {
      ...item,
      className: 'task',
      onDone: this._handleClose.bind(this)
    }
  }

  _handleClose() {
    this.props.onClose()
  }

}

export default Tasks
