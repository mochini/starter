import PropTypes from 'prop-types'
import React from 'react'

class Access extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {}

  render() {
    return (
      <div className="access">
        { Array(15).fill().map((n, index) => (
          <div className="access-right" key={ `access_${index}` }>
            <div className="access-right-label">
              <strong>Right 1</strong><br />
              this is a right this is a right this is a right this is a right
            </div>
            <div className="access-right-icon">
              <i className="fa fa-fw fa-check" />
            </div>
          </div>
        ))}
      </div>
    )
  }


}

export default Access
