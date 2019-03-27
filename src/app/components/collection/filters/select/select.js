import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Select extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
    options: PropTypes.array,
    selected: PropTypes.array,
    onChange: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  render() {
    const { options, selected } = this.props
    return (
      <div className="select">
        { options.map((option, index) => (
          <div className="select-option" key={`option_${index}`} onClick={ this._handleClick.bind(this, index) }>
            <div className="select-option-label">
              <label>{ this._getText(option) }</label>
            </div>
            <div className="select-option-icon">
              { _.includes(selected, this._getValue(option)) && <i className="fa fa-fw fa-check" /> }
            </div>
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet  } = this.props
    if(defaultValue) onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { defaultValue, selected, onChange, onSet } = this.props
    if(!_.isEqual(defaultValue, prevProps.defaultValue)) {
      onSet(defaultValue)
    } else if(!_.isEqual(selected, prevProps.selected)) {
      onChange(selected)
    }
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
    this.props.onToggle(value)
  }

}

export default Select
