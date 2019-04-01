import matchPath from 'react-router-dom/matchPath'
import PropTypes from 'prop-types'
import React from 'react'
import Stack from './stack'

class Router extends React.Component {

  static propTypes = {
    action: PropTypes.string,
    routes: PropTypes.array,
    pathname: PropTypes.string
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    const { cards } = this.state
    return <Stack cards={ cards }/>
  }

  componentDidMount() {
    const { pathname } = this.props
    if(pathname === '/') return
    const route = this._matchRoute(pathname)
    const cards = [ route ]
    this.setState({ cards })
  }

  componentDidUpdate(prevProps) {
    const { action, pathname } = this.props
    if(prevProps.pathname !== pathname) {
      if(action === 'PUSH') {
        const card = this._matchRoute(pathname)
        this._handlePush(card)
      } else if(action === 'POP') {
        this._handlePop()
      }
    }
  }

  _matchRoute(pathname) {
    const { routes } = this.props
    return routes.reduce((found, route) => {
      if(found) return found
      const matched = matchPath(pathname, { path: route.path, exact: true })
      if(!matched) return null
      return {
        pathname,
        component: route.component,
        params: matched.params
      }
    }, null)
  }

  _handlePush(card) {
    this.setState({
      cards: [
        ...this.state.cards,
        card
      ]
    })
  }

  _handlePop() {
    this.setState({
      cards: this.state.cards.slice(0, -1)
    })
  }

}


class RouterWrapper extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  render() {
    const { action, location } = this.context.router.history
    const { pathname } = location
    return (
      <Router { ...this.props } action={ action } pathname={ pathname }>
        { this.props.children }
      </Router>
    )
  }

}


export default RouterWrapper
