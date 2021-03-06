import PropTypes from 'prop-types'
import Signin from '../signin'
import React from 'react'
import _ from 'lodash'

class Presence extends React.PureComponent {

  static childContextTypes = {
    presence: PropTypes.object
  }

  static contextTypes = {
    network: PropTypes.object,
    router: PropTypes.object,
    tracker: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    status: PropTypes.string,
    token: PropTypes.string,
    tourist_id: PropTypes.string,
    user: PropTypes.object,
    onLoadSession: PropTypes.func,
    onLoadToken: PropTypes.func,
    onRemoveToken: PropTypes.func,
    onSaveToken: PropTypes.func,
    onSetToken: PropTypes.func,
    onSignout: PropTypes.func
  }

  static defaultProps = {}

  _handleReload = this._handleReload.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleSignout = this._handleSignout.bind(this)
  _handleToken = this._handleToken.bind(this)

  render() {
    const { status, token } = this.props
    if(status === 'loaded' && token === null) return <Signin />
    if(!_.includes(['refreshing','saved'], status)) return null
    return this.props.children
  }

  componentDidMount() {
    const query = this._getQuery()
    this._handleToken(query.token)
  }

  componentDidUpdate(prevProps) {
    const { token, user, onLoadSession, onRemoveToken } = this.props
    if(!_.isEqual(token, prevProps.token)) {
      if(token === null) {
        onRemoveToken()
      } else if(prevProps.token === null) {
        onLoadSession(token)
      }
    }
    if(!_.isEqual(user, prevProps.user)) {
      if(user) this._handleSignin()
    }
  }

  getChildContext() {
    const { token, user } = this.props
    return {
      presence: {
        token,
        user,
        reload: this._handleReload,
        setToken: this._handleToken,
        signout: this._handleSignout
      }
    }
  }

  _getQuery() {
    const search = this.context.router.history.location.search.substr(1)
    return search.split('&').reduce((query, arg) => ({
      ...query,
      [arg.split('=')[0]]: arg.split('=')[1]
    }), {})
  }

  _handleReload() {
    const { user, onLoadSession } = this.props
    onLoadSession(user.token)
  }

  _handleSignin() {
    const { network, tracker } = this.context
    const { token, user, onSaveToken } = this.props
    onSaveToken(token)
    network.joinChannel(`/sessions/${user.id}`)
    network.subscribe({
      channel: `/sessions/${user.id}`,
      action: 'refresh',
      handler: this._handleReload
    })
    tracker.identify(user)
  }

  _handleSignout() {
    const { network, tracker } = this.context
    const { user } = this.props
    network.leaveChannel(`/sessions/${user.id}`)
    network.unsubscribe({
      channel: `/sessions/${user.id}`,
      action: 'refresh',
      handler: this._handleReload
    })
    tracker.identify(null)
    this.props.onSignout()
  }

  _handleToken(token) {
    if(token) return this.props.onSetToken(token)
    this.props.onLoadToken()
  }

}

export default Presence
