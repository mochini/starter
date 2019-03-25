import PropTypes from 'prop-types'
import React from 'react'

class List extends React.Component {

  static propTypes = {
    data: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { data } = this.props
    return (
      <div className="list">
        { data.map((row, index) => (
          <div className="list-item" key={`row_${index}`}>
            <div className="list-tile">
              <div className="list-tile-icon">
                <i className="fa fa-fw fa-circle-o" />
              </div>
              <div className="list-tile-details">
                <strong>{ row.one }</strong><br />
                { row.two }
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default List
