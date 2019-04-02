import { connect } from 'react-redux'
import Sortable from '../sortable'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Buttons from '../buttons'
import React from 'react'
import qs from 'qs'

class Export extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    filter: PropTypes.object,
    sort: PropTypes.object,
    token: PropTypes.string,
    onClose: PropTypes.func
  }

  state = {
    items: []
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
          <div className="collection-panel-content">
            <Sortable { ...this._getSortable() } />
          </div>
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
        { label: 'Download CSV', color: 'red', handler: this._handleDownload.bind(this, 'csv') },
        { label: 'Download XLSX', color: 'red', handler: this._handleDownload.bind(this, 'xlsx') }
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

  _handleDownload(extension) {
    const { items } = this.state
    const { endpoint, entity, token } = this.props
    const $page = { limit: 0 }
    const $filter = this.props.filter
    const $sort = this.props.sort
    const $select = items.filter(item => item.checked).reduce((select, item) => ({
      ...select,
      [item.label]: item.key
    }), {})
    const query = qs.stringify({ $page, $filter, $sort, $select })
    const entities = pluralize(entity)
    const enclosure = encodeURIComponent('"')
    const url = `${endpoint}.${extension}?enclosure=${enclosure}&filename=${entities}&token=${token}&download=true&${query}`
    window.location.href = url
  }

}

const mapStateToProps = (state, props) => ({
  token: state.presence.token
})

export default connect(mapStateToProps)(Export)
