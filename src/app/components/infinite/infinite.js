import { Appending, Delayed, Empty, Failure, Loader, NotFound, Timeout } from './results'
import Scrollpane from '../scrollpane'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Infinite extends React.Component {

  static propTypes = {
    all: PropTypes.number,
    cacheKey: PropTypes.string,
    delayed: PropTypes.any,
    endpoint: PropTypes.any,
    empty: PropTypes.any,
    failure: PropTypes.any,
    filter: PropTypes.object,
    footer: PropTypes.any,
    header: PropTypes.any,
    layout: PropTypes.any,
    loading: PropTypes.any,
    next: PropTypes.string,
    notFound: PropTypes.any,
    records: PropTypes.array,
    sort: PropTypes.object,
    status: PropTypes.string,
    timeout: PropTypes.any,
    total: PropTypes.number,
    onFetch: PropTypes.func,
    onFetchDelay: PropTypes.func,
    onFetchTimeout: PropTypes.func
  }

  timeout: any = null

  static defaultProps = {
    cacheKey: null,
    delayed: Delayed,
    empty: Empty,
    failure: Failure,
    filter: {},
    footer: null,
    header: null,
    loading: Loader,
    notFound: NotFound,
    sort: {
      key: null,
      order: null
    },
    timeout: Timeout,
    onUpdateSelected: (ids) => {}
  }

  _handleDelay = this._handleDelay.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleRefresh = this._handleRefresh.bind(this)
  _handleTimeout = this._handleTimeout.bind(this)

  render() {
    const { all, delayed, empty, failure, layout, loading, notFound, records, status, timeout, total } = this.props
    return (
      <div className="reframe-infinite">
        { status === 'loading' && !records && this._getComponent(loading) }
        { status === 'delayed' && this._getComponent(delayed) }
        { status === 'timeout' && this._getComponent(timeout) }
        { status === 'failed' && this._getComponent(failure) }
        { status !== 'failed' && total === 0 && all !== 0 && this._getComponent(notFound) }
        { status !== 'failed' && total === 0 && all === 0 && this._getComponent(empty) }
        { status !== 'failed' && records && records.length > 0 && layout &&
          <Scrollpane { ...this._getScrollpane() }>
            { React.createElement(layout, this.props) }
          </Scrollpane>
        }
        { status === 'loading' && records && records.length > 0 && this._getComponent(Appending) }
      </div>
    )
  }

  componentDidMount() {
    this.timeout = null
    this._handleFetch(0, true)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const ignored = ['con','empty','layout','footer','router']
    return Object.keys(_.omit(this.props, ignored)).reduce((update, key) => {
      return update || !_.isEqual(this.props[key], nextProps[key])
    }, false)
  }

  componentDidUpdate(prevProps) {
    const { cacheKey, filter, sort, status } = this.props
    if(this.timeout && status !== prevProps.status && prevProps.status === 'loading') {
      clearTimeout(this.timeout)
    }
    if(cacheKey !== prevProps.cacheKey  || !_.isEqual(prevProps.filter, filter) || !_.isEqual(prevProps.sort, sort)) {
      this._handleFetch(0, true)
    }
  }

  _getComponent(component){
    return _.isFunction(component) ? React.createElement(component, this.props) : component
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
    const query = {
      $page: this._getPagination(skip),
      ...(filter ? { $filter: filter } : {}),
      ...(sort && sort.key ? { $sort: (sort.order === 'desc' ? '-' : '') + sort.key } : {})
    }
    if(onFetch && this._getMore(next, skip, reload, loaded, total)) onFetch(endpoint, query)
    this.timeout = setTimeout(this._handleDelay, 5000)
  }

  _handleRefresh() {
    const { onFetchTimeout } = this.props
    if(onFetchTimeout) onFetchTimeout()
  }

  _handleTimeout() {
    const { status, onFetchTimeout } = this.props
    if(status !== 'delyed') return
    if(onFetchTimeout) onFetchTimeout()
  }

}

export default Infinite
