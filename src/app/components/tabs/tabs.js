import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Tabs extends React.PureComponent {

  static propTypes = {
    chosen: PropTypes.number,
    items: PropTypes.array,
    onChoose: PropTypes.func
  }

  static defaultProps = {
    chosen: null,
    items: [],
    onChoose: (index) => {}
  }

  state = {
    visited: [],
    transitioning: false
  }

  render() {
    const { items } = this.props
    return (
      <div className="tabs">
        <div className="tabs-header">
          <div className="tabs-header-menu">
            <div className={ this._getHeaderClass() }>
              { items.map((item, index) => (
                <div key={`tab_${index}`} className={ this._getItemClass(index) } onClick={ this._handleChoose.bind(this, index) }>
                  { item.label }
                </div>
              )) }
            </div>
          </div>
        </div>
        <div className="tabs-body">
          { items.map((item, index) => (
            <div key={`tab_${index}`} className={ this._getTabClass(index) }>
              { item.component && (_.isFunction(item.component) ? React.createElement(item.component) : item.component) }
              { item.panel &&
                <div className="tab-panel">
                  { _.isFunction(item.panel) ? React.createElement(item.panel) : item.panel }
                </div>
              }
            </div>
          )) }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onChoose(0)
  }

  _getHeaderClass() {
    const { items } = this.props
    const numbers = ['one','two','three','four','five']
    const tabs = numbers[items.length - 1]
    const classes = ['ui','item',tabs,'menu']
    return classes.join(' ')
  }

  _getItemClass(index) {
    const { chosen } = this.props
    const classes = ['item']
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _getTabClass(index) {
    const { transitioning } = this.state
    const { chosen } = this.props
    const classes = ['tab']
    if(transitioning) classes.push('transitioning')
    if(index > chosen) classes.push('right')
    if(index < chosen) classes.push('left')
    if(index === chosen) classes.push('active')
    return classes.join(' ')
  }

  _getComponent(index) {
    const { chosen } = this.props
    return {
      active: (index === chosen)
    }
  }

  _handleChoose(index: number): void {
    const { onChoose } = this.props
    const visited = _.uniq([ ...this.state.visited, index ])
    this.setState({ visited, transitioning: true })
    setTimeout(() => onChoose(index), 20)
    setTimeout(() => this.setState({ transitioning: false }), 500)
  }

}

export default Tabs
