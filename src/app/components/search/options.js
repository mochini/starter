import PropTypes from 'prop-types'
import Format from '../format'
import React from 'react'
import _ from 'lodash'

class Options extends React.Component {

  static contextTypes = {}

  static propTypes = {
    format: PropTypes.any,
    records: PropTypes.array,
    searched: PropTypes.array,
    text: PropTypes.string,
    value: PropTypes.string,
    onToggle: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { format, records, searched } = this.props
    return (
      <div className="search-options">
        { records.map((option, index) => (
          <div className="search-option" key={`option_${index}`} onClick={ this._handleClick.bind(this, option) }>
            <div className="search-option-label">
              <Format { ...option } format={ format } value={ this._getText(option) } />
            </div>
            <div className="search-option-icon">
              { _.includes(searched, this._getValue(option)) && <i className="fa fa-fw fa-check" /> }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getValue(option) {
    const { value } = this.props
    return _.isPlainObject(option) ? _.get(option, value) : option
  }

  _getText(option) {
    const { text } = this.props
    return _.isPlainObject(option) ? _.get(option, text) : option
  }

  _handleClick(option) {
    const value = this._getValue(option)
    this.props.onToggle(value)
  }

}

export default Options
