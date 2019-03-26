import Buttons from '../../buttons'
import PropTypes from 'prop-types'
import Sortable from '../../sortable'
import React from 'react'

class Export extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  render() {
    return (
      <div className="export-panel">
        <div className="export-panel-header">
          Export Records
        </div>
        <div className="export-panel-body">
          <Sortable { ...this._getSortable() } />
        </div>
        <div className="export-panel-footer">
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

}

export default Export
