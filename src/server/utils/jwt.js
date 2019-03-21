import jwt from 'jsonwebtoken'

const TWO_WEEKS = 60 * 60 * 24 * 7 * 2

export const encode = (user_id, duration = TWO_WEEKS) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + duration
  return jwt.sign({ iat, exp, user_id }, process.env.SECRET)
}

export const decode = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET)
  } catch(e) {
    return {
      err: e.message
    }
  }
}
