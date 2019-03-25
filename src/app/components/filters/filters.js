import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Items from './items'
import Filter from './filter'
import React from 'react'

class Filters extends React.Component {

  static contextTypes = {}

  static propTypes = {
    data: PropTypes.object,
    filters: PropTypes.array,
    label: PropTypes.string,
    selected: PropTypes.number,
    onChange: PropTypes.func,
    onSelect: PropTypes.func
  }

  static defaultProps = {}

  state = {
    selected: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSelect = this._handleSelect.bind(this)

  render() {
    const { selected } = this.state
    return (
      <div className="filters">
        <Items { ...this._getItems() } />
        <CSSTransition in={ selected !== null && this.props.selected !== null } classNames="translatex" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <Filter { ...this._getFilter(selected) } />
        </CSSTransition>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { selected } = this.props
    if(selected !== prevProps.selected) {
      if(selected !== null) {
        this.setState({ selected })
      } else {
        setTimeout(() => {
          this.setState({ selected })
        }, 500)
      }
    }
  }

  _getItems() {
    const { data, filters, label } = this.props
    return {
      data,
      filters,
      label,
      onSelect: this._handleSelect
    }
  }

  _getFilter(selected) {
    const { data, filters } = this.props
    const filter = filters[selected]
    if(!filter) return {}
    return {
      defaultValue: data[filter.key],
      filter,
      onBack: this._handleBack,
      onChange: this._handleChange
    }
  }

  _handleBack() {
    this.props.onSelect(null)
  }

  _handleChange(key, value) {
    this.props.onChange(key, value)
  }

  _handleSelect(index) {
    this.props.onSelect(index)
  }

}

export default Filters
