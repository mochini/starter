import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Filters extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
    include: PropTypes.array,
    selected: PropTypes.array,
    onChange: PropTypes.func,
    onSet: PropTypes.func,
    onToggle: PropTypes.func
  }

  static defaultProps = {
    include: ['this','last','next'],
    onChange: () => {}
  }

  render() {
    const { selected } = this.props
    const options = this._getOptions()
    return (
      <div className="select">
        { options.map((option, index) => (
          <div className="select-option" key={`option_${index}`} onClick={ this._handleClick.bind(this, index) }>
            <div className="select-option-icon">
              { _.includes(selected, option.value) ?
                <i className="fa fa-fw fa-check-circle" /> :
                <i className="fa fa-fw fa-circle-o" />
              }
            </div>
            <div className="select-option-label">
              <label>{ option.text }</label>
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
    const { selected, onChange  } = this.props
    if(selected.length !== prevProps.selected.length) {
      onChange(selected)
    }
  }

  _getOptions() {
    const { include } = this.props
    const options = []
    if(_.includes(include, 'this')) options.push({ value: 'this_week', text: 'This Week' })
    if(_.includes(include, 'last')) options.push({ value: 'last_week', text: 'Last Week' })
    if(_.includes(include, 'next')) options.push({ value: 'next_week', text: 'Next Week' })
    if(_.includes(include, 'this')) options.push({ value: 'this_month', text: 'This Month' })
    if(_.includes(include, 'last')) options.push({ value: 'last_month', text: 'Last Month' })
    if(_.includes(include, 'next')) options.push({ value: 'next_month', text: 'Next Month' })
    if(_.includes(include, 'this')) options.push({ value: 'this_quarter', text: 'This Quarter' })
    if(_.includes(include, 'last')) options.push({ value: 'last_quarter', text: 'Last Quarter' })
    if(_.includes(include, 'next')) options.push({ value: 'next_quarter', text: 'Next Quarter' })
    if(_.includes(include, 'this')) options.push({ value: 'this_year', text: 'This Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_year', text: 'Last Year' })
    if(_.includes(include, 'next')) options.push({ value: 'next_year', text: 'Next Year' })
    if(_.includes(include, 'last')) options.push({ value: 'last_30', text: 'Last 30 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_30', text: 'Next 30 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_60', text: 'Last 60 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_60', text: 'Next 60 Days' })
    if(_.includes(include, 'last')) options.push({ value: 'last_90', text: 'Last 90 Days' })
    if(_.includes(include, 'next')) options.push({ value: 'next_90', text: 'Next 90 Days' })
    options.push({ value: 'ytd', text: 'Year to Date' })
    options.push({ value: 'ltd', text: 'Life to Date' })
    options.push({ value: 'custom', text: 'Custom' })
    return options
  }

  _handleClick(index) {
    const { options } = this.props
    const value = this._getValue(options[index])
    this.props.onToggle(value)
  }

}

export default Filters
