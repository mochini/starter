import PropTypes from 'prop-types'
import Buttons from '../buttons'
import React from 'react'

class Message extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    animation: PropTypes.string,
    buttons: PropTypes.array,
    icon: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    component: PropTypes.object
  }

  static defaultProps = {
    animation: null,
    color: null
  }

  state = {
    animate: false
  }

  render() {
    const { buttons, component, icon, image, text, title } = this.props
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
          { image &&
            <div className="message-panel-icon">
              <img src={ image } />
            </div>
          }
          { title && <h3>{ title }</h3> }
          { text && <p>{ text }</p> }
          { component }
          { buttons && <Buttons { ...this._getButtons() } /> }
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

  _getButtons() {
    const { buttons } = this.props
    return {
      buttons: buttons.map(button => ({
        basic: true,
        color: 'red',
        label: button.label,
        modal: button.modal,
        handler: button.handler,
        request: button.request
      }))
    }
  }
}

export default Message
