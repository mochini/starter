import PropTypes from 'prop-types'
import React from 'react'

class Details extends React.PureComponent {

  static childContextTypes = {}

  static propTypes = {
    items: PropTypes.array
  }

  render() {
    const { items } = this.props
    return (
      <div className="details">
        { items.map((item, index) => (
          <div className="details-item" key={`item_${index}`}>
            <div className="details-item-label">
              { item.label }
            </div>
            <div className="details-item-value">
              { item.value }
            </div>
          </div>
        ))}
      </div>
    )
  }


}

export default Details
