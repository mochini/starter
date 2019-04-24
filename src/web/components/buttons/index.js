import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button'

class Buttons extends React.PureComponent {

  static propTypes = {
    buttons: PropTypes.array
  }

  render() {
    const { buttons } = this.props
    return (
      <div className="buttons">
        { buttons && buttons.map((button, index) => (
          <div className="buttons-item" key={`button_item_${index}`}>
            <Button { ...buttons[index] } key={`button_${index}`} />
          </div>
        )) }
      </div>
    )
  }

}

export default Buttons
