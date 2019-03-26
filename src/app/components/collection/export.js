import Sortable from '../sortable'
import PropTypes from 'prop-types'
import Buttons from '../buttons'
import React from 'react'

class Export extends React.Component {

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
            Export Records
          </div>
          <div className="collection-panel-header-close" onClick={ this._handleClose }>
            <i className="fa fa-fw fa-remove" />
          </div>
        </div>
        <div className="collection-panel-body">
          <Sortable { ...this._getSortable() } />
        </div>
        <div className="collection-panel-footer">
          <Buttons { ...this._getButtons() } />
        </div>
      </div>
    )
  }

  _getButtons() {
    return {
      buttons: [
        { label: 'Download CSV', color: 'red' },
        { label: 'Download XLSX', color: 'red' }
      ]
    }
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

export default Export
