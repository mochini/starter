import jwt from 'jsonwebtoken'

const TWO_WEEKS = 60 * 60 * 24 * 7 * 2

export const encode = (user_id) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + TWO_WEEKS
  return jwt.sign({ iat, exp, user_id }, process.env.SECRET)
}

export const decode = (token) => {
  return jwt.verify(token, process.env.SECRET)
}
