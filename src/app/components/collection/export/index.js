import Buttons from '../../buttons'
import PropTypes from 'prop-types'
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
          exportrecords
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


}

export default Export
