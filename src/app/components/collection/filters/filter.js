import PropTypes from 'prop-types'
import Button from '../../button'
import React from 'react'

import Daterange from './daterange'
import Select from './select'

class Filter extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.any,
    filter: PropTypes.object,
    onBack: PropTypes.func,
    onChange: PropTypes.func,
    onReset: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleReset = this._handleReset.bind(this)

  render() {
    const { filter } = this.props
    return (
      <div className="collection-panel">
        <div className="collection-panel-header" onClick={ this._handleBack }>
          <div className="collection-panel-header-back">
            <i className="fa fa-fw fa-chevron-left" />
          </div>
          <div className="collection-panel-header-label">
            { filter.label }
          </div>
        </div>
        <div className="collection-panel-body">
          { filter.type === 'daterange' && <Daterange { ...this._getDaterange() }/> }
          { filter.type === 'select' && <Select { ...this._getSelect() }/> }
        </div>
        <div className="collection-panel-footer">
          <Button { ...this._getButton() } />
        </div>
      </div>
    )
  }

  _getButton() {
    return {
      label: 'Reset Filter',
      color: 'red',
      handler: this._handleReset
    }
  }

  _getDaterange() {
    const { defaultValue, filter } = this.props
    return {
      defaultValue,
      ...filter,
      onChange: this._handleChange
    }
  }

  _getSelect() {
    const { defaultValue, filter } = this.props
    return {
      defaultValue,
      ...filter,
      onChange: this._handleChange
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChange(value) {
    const { filter } = this.props
    this.props.onChange(filter.key, value)
  }

  _handleReset() {
    const { filter } = this.props
    this.props.onReset(filter.key)
  }

}

export default Filter
