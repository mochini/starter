import React from 'react'
import PropTypes from 'prop-types'
import Image from '../image'

class Avatar extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    size: PropTypes.string
  }

  static defaultProps = {}

  render() {
    const { user } = this.props
    return (
      <div className="avatar">
        { user.photo && <Image { ...this._getImage() } />}
        { !user.photo &&
          <div className="avatar-initials">
            { user.initials }
          </div>
        }
      </div>
    )
  }

  _getImage() {
    const { user, size } = this.props
    return {
      transforms: size ? { w: size, h: size, fit: 'cover' } : null,
      src: user.photo,
      alt: user.full_name,
      title: user.full_name
    }
  }

}

export default Avatar
