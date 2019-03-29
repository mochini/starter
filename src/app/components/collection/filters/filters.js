import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Items from './items'
import Filter from './filter'
import React from 'react'
import _ from 'lodash'

class Filters extends React.Component {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.object,
    data: PropTypes.array,
    filters: PropTypes.array,
    label: PropTypes.string,
    selected: PropTypes.number,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onReset: PropTypes.func,
    onSelect: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {}
  }

  state = {
    selected: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleSelect = this._handleSelect.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

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

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue.$and)
  }

  componentDidUpdate(prevProps) {
    const { data, selected } = this.props
    if(selected !== prevProps.selected) {
      if(selected !== null) {
        this.setState({ selected })
      } else {
        setTimeout(() => {
          this.setState({ selected })
        }, 500)
      }
    } else if(!_.isEqual(data, prevProps.data)) {
      this._handleChange()
    }
  }

  _getItems() {
    const { data, filters, label } = this.props
    return {
      data: data.reduce((data, item) => ({
        ...data,
        [Object.keys(item)[0]]: Object.values(item)[0]
      }), {}),
      filters,
      label,
      onClose: this._handleClose,
      onSelect: this._handleSelect,
      onReset: this._handleReset
    }
  }

  _getFilter(selected) {
    const { filters } = this.props
    const filter = filters[selected]
    if(!filter) return {}
    const data = this.props.data.find(item => Object.keys(item)[0] === filter.key)
    return {
      defaultValue: data ? data[filter.key] : null,
      filter,
      onBack: this._handleBack,
      onChange: this._handleUpdate,
      onReset: this._handleReset
    }
  }

  _handleBack() {
    this.props.onSelect(null)
  }

  _handleChange() {
    const $and = this.props.data
    this.props.onChange({ $and })
  }

  _handleClose() {
    this.props.onClose()
  }

  _handleReset(key) {
    this.props.onReset(key)
  }

  _handleSelect(index) {
    this.props.onSelect(index)
  }

  _handleUpdate(key, value) {
    this.props.onUpdate(key, value)
  }

}

export default Filters
