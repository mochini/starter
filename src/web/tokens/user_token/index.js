import Avatar from '../../components/avatar'
import PropTypes from 'prop-types'
import React from 'react'

const UserToken = (user) => (
  <div className="user-token">
    <div className="user-token-image">
      <Avatar user={ user } size={ 36 } />
    </div>
    <div className="user-token-details">
      <strong>{ user.full_name }</strong><br />
      { user.email }
    </div>
  </div>
)

UserToken.propTypes = {
  email: PropTypes.string,
  full_name: PropTypes.string,
  id: PropTypes.number,
  photo: PropTypes.string
}

export default UserToken
