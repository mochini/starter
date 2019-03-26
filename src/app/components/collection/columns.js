import PropTypes from 'prop-types'
import React from 'react'

class Columns extends React.Component {

  static contextTypes = {}

  static propTypes = {
    onClose: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    return (
      <div className="collection-panel">
        <div className="collection-panel-header">
          <div className="collection-panel-header-label">
            Manage Columns
          </div>
          <div className="collection-panel-header-close" onClick={ this._handleClose }>
            <i className="fa fa-fw fa-remove" />
          </div>
        </div>
        <div className="collection-panel-body">
        </div>
      </div>
    )
  }

  _handleClose() {
    this.props.onClose()
  }

}

export default Columns
