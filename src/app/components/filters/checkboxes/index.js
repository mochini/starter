import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Filters extends React.Component {

  static contextTypes = {}

  static propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  render() {
    const { options } = this.props
    return (
      <div className="checkboxes">
        { options.map((option, index) => (
          <div className="ui checkbox" key={`option_${index}`} onClick={ this._handleClick.bind(this, index) }>
            <input type="checkbox" name="example" />
            <label>{ this._getText(option) }</label>
          </div>
        )) }
      </div>
    )
  }

  _getValue(option) {
    return _.isPlainObject(option) ? option.value : option
  }

  _getText(option) {
    return _.isPlainObject(option) ? option.text : option
  }

  _handleClick(index) {
    const { options } = this.props
    const value = this._getValue(options[index])
    this.props.onChange(value)
  }

}

export default Filters
