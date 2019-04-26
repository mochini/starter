import PropTypes from 'prop-types'
import React from 'react'

class Message extends React.Component {

  static propTypes = {
    animation: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    onAllow: PropTypes.func,
    onDeny: PropTypes.func
  }

  static defaultProps = {
    animation: null,
    color: null
  }

  state = {
    animate: false
  }

  _handleAllow = this._handleAllow.bind(this)
  _handleDeny = this._handleDeny.bind(this)

  render() {
    const { icon, text, title } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="message-panel">
          { icon &&
            <div className="message-panel-icon">
              <h2>
                <i className={ this._getIconClass() } />
              </h2>
            </div>
          }
          { title && <h3>{ title }</h3> }
          { text && <p>{ text }</p> }
          <div className="buttons">
            <div className="ui fluid red basic button" onClick={ this._handleDeny }>
              No Thanks
            </div>
            <div className="ui fluid red basic button" onClick={ this._handleAllow }>
              Allow Access
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    if(!this.props.animation) return
    setTimeout(() => {
      this.setState({ animate: true })
      setTimeout(() => {
        this.setState({ animate: false })
      }, 500)
    }, 500)
  }

  _getClass() {
    const { color } = this.props
    const classes = ['message']
    if(color) classes.push(color)
    return classes.join(' ')
  }

  _getIconClass() {
    const { animate } = this.state
    const { animation, icon } = this.props
    const classes = ['fa', `fa-${icon}`]
    if(animate && animation) classes.push(`animated ${animation}`)
    return classes.join(' ')
  }

  _handleAllow() {
    this.props.onAllow()
  }

  _handleDeny() {
    this.props.onDeny()
  }

}

export default Message
