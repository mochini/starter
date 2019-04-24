import PropTypes from 'prop-types'
import React from 'react'

class Access extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    rights: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { rights } = this.props
    return (
      <div className="access">
        { rights.map((right, index) => (
          <div className="access-right" key={ `access_${index}` }>
            <div className="access-right-label">
              <strong>{ right.code }</strong><br />
              { right.description }
            </div>
            <div className="access-right-icon">
              { right.is_assigned ?
                <i className="fa fa-fw fa-check" /> :
                <i className="fa fa-fw fa-times" />
              }
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default Access
