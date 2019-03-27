import PropTypes from 'prop-types'
import React from 'react'

class Panel extends React.Component {

  static contextTypes = {
    drawer: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    items: PropTypes.array,
    label: PropTypes.string,
    path: PropTypes.array,
    onBack: PropTypes.func,
    onForward: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)

  render() {
    const { items, label, path } = this.props
    return (
      <div className="menu-panel">
        <div className="menu-panel-header" onClick={ this._handleBack }>
          <div className="menu-panel-header-nav">
            { path.length > 0 ?
              <i className="fa fa-fw fa-chevron-left" /> :
              <i className="fa fa-fw fa-shield"></i>
            }
          </div>
          <div className="menu-panel-header-label">
            { label || 'Menu' }
          </div>
        </div>
        <div className="menu-panel-body">
          { items.map((item, index) => (
            <div className="menu-item" key={`item_${index}`} onClick={ this._handleClick.bind(this, item, index) }>
              <div className="menu-item-label">
                { item.label }
              </div>
              { item.items &&
                <div className="menu-item-icon">
                  <i className="fa fa-fw fa-chevron-right" />
                </div>
              }
            </div>
          ))}
        </div>
      </div>
    )
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleClick(item, index) {
    if(item.route) {
      this.context.drawer.close()
      this.context.router.history.push(item.route)
    } else {
      this.props.onForward(index)
    }
  }

}

export default Panel
