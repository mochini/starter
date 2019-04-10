import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import Message from '../message'
import Loader from '../loader'
import React from 'react'
import Page from './page'
import _ from 'lodash'

const PageCreator = (mapResourcesToPage, mapPropsToPage) => {

  class PageContainer extends React.PureComponent {

    static contextTypes = {
      network: PropTypes.object,
      portal: PropTypes.object,
      presence: PropTypes.object,
      router: PropTypes.object
    }

    static propTypes = {
      active: PropTypes.bool,
      component: PropTypes.object,
      data: PropTypes.object,
      params: PropTypes.object,
      pathname: PropTypes.string,
      resources: PropTypes.object,
      status: PropTypes.string,
      onFetchResource: PropTypes.func,
      onReady: PropTypes.func
    }

    state = {
      access: true,
      cacheKey: null
    }

    _handleBack = this._handleBack.bind(this)
    _handleFetchResources = this._handleFetchResources.bind(this)
    _handleInit = this._handleInit.bind(this)
    _handleReady = this._handleReady.bind(this)
    _handleRefreshResources = this._handleRefreshResources.bind(this)

    render() {
      const { status } = this.props
      if(!_.includes(['pending','loading','failure','forbidden'], status)) {
        return <Page { ...this._getPage() } />
      }
      return (
        <ModalPanel { ...this._getPanel() }>
          { _.includes(['pending','loading'], status) && <Loader /> }
          { status === 'failure' && <Message { ...this._getFailure() } /> }
          { status === 'forbidden' && <Message { ...this._getForbidden() } /> }
        </ModalPanel>
      )
    }

    componentDidMount() {
      const { active, pathname } = this.props
      const { network } = this.context
      if(active) this._handleInit()
      network.joinChannel(pathname)
      network.subscribe({
        channel: pathname,
        action: 'refresh',
        handler: this._handleRefreshResources
      })
    }

    componentDidUpdate(prevProps) {
      const { active } = this.props
      if(active !== prevProps.active && active) {
        setTimeout(this._handleInit, 600)
      }
    }

    componentWillUnmount() {
      const { network } = this.context
      const { pathname } = this.props
      network.leaveChannel(pathname)
      network.unsubscribe({
        channel: pathname,
        action: 'refresh',
        handler: this._handleRefreshResources
      })
    }

    _getPanel() {
      return {
        title: ''
      }
    }

    _getFailure() {
      return {
        icon: 'exclamation-triangle',
        title: 'Unable to load this page',
        button: {
          label: 'Try again',
          handler: this._handleFetchResources
        }
      }
    }

    _getForbidden() {
      return {
        icon: 'exclamation-triangle',
        title: 'You do not have permission to access this content'
      }
    }

    _getPage() {
      const { cacheKey } = this.state
      const { active, data, params, pathname } = this.props
      const page = { params, pathname }
      const pageProps = mapPropsToPage(this.props, this.context, data, page)
      return {
        ...pageProps,
        active,
        cacheKey,
        data,
        page
      }
    }

    _handleBack() {
      this.context.router.goBack()
    }

    _handleFetchResources() {
      const { params, pathname, onFetchResource } = this.props
      const page = { params, pathname }
      if(!mapResourcesToPage) return
      const resources = mapResourcesToPage(this.props, this.context, page)
      Object.keys(resources).map(prop => onFetchResource(prop, resources[prop]))
    }

    _handleInit() {
      if(!mapResourcesToPage) return this._handleReady()
      if(this.props.status === 'pending') this._handleFetchResources()
    }


    _handleRefreshResources() {
      this.setState({ cacheKey: _.random(100000, 999999).toString(36) })
      this._handleFetchResources()
    }

    _handleReady() {
      this.props.onReady()
    }

  }

  return PageContainer

}

export default PageCreator
