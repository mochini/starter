import { Appending, Delayed, Empty, Failure, NotFound, Timeout } from './results'
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
    footer: PropTypes.any,
    header: PropTypes.any,
    layout: PropTypes.any,
    next: PropTypes.string,
    parentProps: PropTypes.object,
    records: PropTypes.array,
    sort: PropTypes.object,
    status: PropTypes.string,
    total: PropTypes.number,
    onFetch: PropTypes.func,
    onFetchDelay: PropTypes.func,
    onFetchTimeout: PropTypes.func
  }

  static defaultProps = {
    filter: {},
    footer: null,
    header: null,
    sort: {
      key: null,
      order: null
    },
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
        { status === 'delayed' && <Delayed /> }
        { status === 'timeout' && <Timeout /> }
        { status === 'failed' && <Failure /> }
        { status !== 'failed' && total === 0 && all !== 0 && <NotFound /> }
        { status !== 'failed' && total === 0 && all === 0 && <Empty /> }
        { status !== 'failed' && records && records.length > 0 && layout &&
          <Scrollpane { ...this._getScrollpane() }>
            <this.props.layout { ...this._getLayout() } { ...parentProps } />
          </Scrollpane>
        }
        { status === 'loading' && records && records.length > 0 && <Appending /> }
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch(0, true)
  }

  componentDidUpdate(prevProps) {
    const { filter, sort, status } = this.props
    console.log(filter)
    if(this.timeout && status !== prevProps.status && prevProps.status === 'loading') {
      clearTimeout(this.timeout)
    }
    if(!_.isEqual(prevProps.filter, filter) || !_.isEqual(prevProps.sort, sort)) {
      this._handleFetch(0, true)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const ignored = ['con','router']
    return Object.keys(_.omit(this.props, ignored)).reduce((update, key) => {
      return update || !_.isEqual(this.props[key], nextProps[key])
    }, false)
  }

  _getLayout() {
    return {
      ...this.props
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
    const { endpoint, next, records, sort, total, onFetch } = this.props
    const loaded = records ? records.length : 0
    const $page = this._getPagination(skip)
    const $filter = this.props.filter
    const $sort = (sort.order === 'desc' ? '-' : '') + sort.key
    const query = { $page, $filter, $sort }
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
