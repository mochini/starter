import PropTypes from 'prop-types'
import React from 'react'

const RightToken = ({ code, description }) => (
  <div className="right-token">
    <strong>{ code }</strong><br />
    foo bar baz foo bar baz foo bar baz foo bar baz foo bar baz foo bar baz
  </div>
)

RightToken.propTypes = {
  code: PropTypes.string,
  description: PropTypes.string
}

export default RightToken
