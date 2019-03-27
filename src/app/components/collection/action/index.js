import PropTypes from 'prop-types'
import React from 'react'

class Actions extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  icon = null

  state = {
    show: false
  }

  _handleClick = this._handleClick.bind(this)
  _handleClose = this._handleClose.bind(this)

  render() {
    const { show } = this.state
    return (
      <div className="actions">
        <i className="fa fa-fw fa-ellipsis-v" ref={ node => this.icon = node } onClick={ this._handleClick } />
        { show &&
          <div className="actions-dropdown">
            <div className="actions-item">
              item 1
            </div>
            <div className="actions-item">
              item 2
            </div>
            <div className="actions-item">
              item 3
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('click', this._handleClose, false)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this._handleClose, false)
  }

  _handleClick() {
    const { show } = this.state
    this.setState({ show: !show })
  }

  _handleClose(e) {
    if(!this.state.show) return
    if(e.target === this.icon) return
    this.setState({ show: false })
  }

}

export default Actions
