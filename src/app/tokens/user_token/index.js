import PropTypes from 'prop-types'
import React from 'react'

const UserToken = ({ id, full_name, email }) => (
  <div className="user-token">
    <div className="user-token-image">
      <div className="image">
        <img src={ `http://i.pravatar.cc/300?u=${ id }` } />
      </div>
    </div>
    <div className="user-token-details">
      <strong>{ full_name }</strong><br />
      { email }
    </div>
  </div>
)

UserToken.propTypes = {
  email: PropTypes.string,
  full_name: PropTypes.string,
  id: PropTypes.number
}

export default UserToken
