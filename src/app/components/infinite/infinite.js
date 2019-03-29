import Message from '../message'
import Loader from '../loader'
import Scrollpane from '../scrollpane'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Infinite extends React.Component {

  static propTypes = {
    all: PropTypes.number,
    endpoint: PropTypes.any,
    filter: PropTypes.object,
    layout: PropTypes.any,
    next: PropTypes.string,
    parentProps: PropTypes.object,
    records: PropTypes.array,
    selectable: PropTypes.bool,
    selectAll: PropTypes.bool,
    selected: PropTypes.array,
    sort: PropTypes.array,
    status: PropTypes.string,
    total: PropTypes.number,
    onFetch: PropTypes.func,
    onFetchDelay: PropTypes.func,
    onFetchTimeout: PropTypes.func,
    onSelect: PropTypes.func,
    onToggle: PropTypes.func,
    onToggleAll: PropTypes.func
  }

  static defaultProps = {
    filter: {},
    selectable: false,
    onUpdateSelected: (ids) => {}
  }

  timeout = null

  _handleDelay = this._handleDelay.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleRefresh = this._handleRefresh.bind(this)
  _handleTimeout = this._handleTimeout.bind(this)

  render() {
    const { all, layout, parentProps, records, status, total } = this.props
    return (
      <div className="infinite">
        { status === 'loading' && !records && <Loader /> }
        { status === 'delayed' && <Message { ...this._getDelayed() } /> }
        { status === 'timeout' && <Message { ...this._getTimeout() } /> }
        { status === 'failed' && <Message { ...this._getFailure() } /> }
        { status !== 'failed' && total === 0 && all !== 0 && <Message { ...this._getNotFound() } /> }
        { status !== 'failed' && total === 0 && all === 0 && <Message { ...this._getEmpty() } /> }
        { status !== 'failed' && records && records.length > 0 && layout &&
          <Scrollpane { ...this._getScrollpane() }>
            <this.props.layout { ...this._getLayout() } { ...parentProps } />
          </Scrollpane>
        }
        { status === 'loading' && records && records.length > 0 &&
          <div className="infinite-loader">
            <div className="ui active inverted dimmer">
              <div className="ui small loader" />
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch(0, true)
  }

  componentDidUpdate(prevProps) {
    const { filter, selected, sort, status } = this.props
    if(this.timeout && status !== prevProps.status && prevProps.status === 'loading') {
      clearTimeout(this.timeout)
    }
    if(!_.isEqual(prevProps.filter, filter) || !_.isEqual(prevProps.sort, sort)) {
      this._handleFetch(0, true)
    }
    if(selected.length !== prevProps.selected.length) {
      this._handleSelect()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const ignored = ['con','router']
    return Object.keys(_.omit(this.props, ignored)).reduce((update, key) => {
      return update || !_.isEqual(this.props[key], nextProps[key])
    }, false)
  }

  _getDelayed() {
    return {
      text: 'This is taking longer than we expected...'
    }
  }

  _getEmpty() {
    return {
      icon: 'times',
      title: 'No records',
      text: 'There are no records'
    }
  }

  _getFailure() {
    return {
      icon: 'exclamation-triangle ',
      title: 'Unable to load records',
      text: 'There was a problem with fetching your data'
    }
  }

  _getTimeout() {
    return {
      icon: 'hourglass-end',
      title: 'Your request timed out',
      text: 'It took too long to complete your request'
    }
  }

  _getLayout() {
    const { records, selectable, selected, selectAll, onToggle, onToggleAll } = this.props
    return {
      records,
      selectable,
      selected,
      selectAll,
      onToggle,
      onToggleAll
    }
  }

  _getNotFound() {
    return {
      icon: 'times',
      title: 'No Results Found',
      text: 'No records matched your query'
    }
  }

  _getMore(next, skip, reload, loaded, total) {
    if(reload) return true
    if(next !== undefined) return next !== null
    if(total === undefined && skip === 0) return true
    if(total !== undefined) return loaded < total
  }

  _getPagination(skip) {
    const { next, records } = this.props
    const loaded = records ? records.length : 0
    if(next) return { next }
    return { skip: skip !== null ? skip : loaded }
  }

  _getScrollpane() {
    return {
      onReachBottom: this._handleFetch
    }
  }

  _handleDelay() {
    const { status, onFetchDelay } = this.props
    if(status !== 'loading') return
    if(onFetchDelay) onFetchDelay()
    this.timeout = setTimeout(this._handleTimeout, 5000)
  }

  _handleFetch(skip = null, reload = false) {
    const { endpoint, filter, next, records, sort, total, onFetch } = this.props
    const loaded = records ? records.length : 0
    const $page = this._getPagination(skip)
    const query = { $page, $filter: filter, $sort: sort }
    if(onFetch && this._getMore(next, skip, reload, loaded, total)) onFetch(endpoint, query)
    this.timeout = setTimeout(this._handleDelay, 5000)
  }

  _handleRefresh() {
    const { onFetchTimeout } = this.props
    if(onFetchTimeout) onFetchTimeout()
  }

  _handleSelect() {
    const { records, onSelect } = this.props
    const selected = records.filter((record, index) => _.includes(this.props.selected, index))
    onSelect(selected)
  }

  _handleTimeout() {
    const { status, onFetchTimeout } = this.props
    if(status !== 'delyed') return
    if(onFetchTimeout) onFetchTimeout()
  }

}

export default Infinite
