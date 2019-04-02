import Sortable from '../sortable'
import PropTypes from 'prop-types'
import React from 'react'

class Columns extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
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
          <div className="collection-panel-content">
            <Sortable { ...this._getSortable() } />
          </div>
        </div>
      </div>
    )
  }

  _getSortable() {
    const { defaultValue } = this.props
    return {
      defaultValue,
      onUpdate: (items) => this.setState({ items })
    }
  }

  _handleClose() {
    this.props.onClose()
  }

}

export default Columns
