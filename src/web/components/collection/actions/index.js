import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Button from '../../button'
import React from 'react'

class Actions extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    items: PropTypes.array,
    record: PropTypes.object
  }

  icon = null

  state = {
    position: 'top',
    show: false
  }

  _handleClick = this._handleClick.bind(this)
  _handleClose = this._handleClose.bind(this)

  render() {
    const { items } = this.props
    const { position, show } = this.state
    return (
      <div className="actions">
        <div className="actions-icon" onClick={ this._handleClick }>
          <i className="fa fa-fw fa-ellipsis-v" ref={ node => this.icon = node } />
        </div>
        <CSSTransition in={ show } classNames="opacity" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="actions-overlay" onClick={ this._handleClose }/>
        </CSSTransition>
        <CSSTransition in={ show } classNames="translatey" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className={`actions-dropdown ${position}`}>
            { items.map((item, index) => (
              <Button key={`action_${index}`} { ...this._getButton(item) }/>
            ))}
            <div className="actions-item" onClick={ this._handleClose }>
              Cancel
            </div>
          </div>
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('click', this._handleClose, false)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._handleClose, false)
  }

  _getButton(item){
    const { record } = this.props
    return {
      ...item,
      modal: <item.modal { ...record } />,
      className: 'actions-item',
      onDone: this._handleClose.bind(this)
    }
  }

  _handleClick(e) {
    e.stopPropagation()
    const percent = (e.clientY / window.innerHeight) * 100
    const show = !this.state.show
    const position = percent < 80 ? 'bottom' : 'top'
    this.setState({ show, position })
  }

  _handleClose(e) {
    if(!this.state.show) return
    if(e) e.stopPropagation()
    if(e && e.target === this.icon) return
    this.setState({ show: false })
  }

}

export default Actions
