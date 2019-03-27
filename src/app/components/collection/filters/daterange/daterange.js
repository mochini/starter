import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Filters extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.string,
    include: PropTypes.array,
    options: PropTypes.array,
    selected: PropTypes.string,
    onChange: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    include: ['this','last','next'],
    onChange: () => {}
  }

  render() {
    const { options, selected } = this.props
    return (
      <div className="select">
        { options.map((option, index) => (
          <div className="select-option" key={`option_${index}`} onClick={ this._handleClick.bind(this, option) }>
            <div className="select-option-label">
              <label>{ option.text }</label>
            </div>
            <div className="select-option-icon">
              { option.value === selected && <i className="fa fa-fw fa-check" /> }
            </div>
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
  }

  componentDidUpdate(prevProps) {
    const { defaultValue, selected, onChange, onSet } = this.props
    if(!_.isEqual(defaultValue, prevProps.defaultValue)) {
      onSet(defaultValue)
    } else if(selected !== prevProps.selected) {
      onChange(selected)
    }
  }

  _handleClick(option) {
    this.props.onToggle(option.value)
  }

}

export default Filters
