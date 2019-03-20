import { testHandler } from '../../utils/test'
import { encode } from '../../lib/jwt'
import { expect } from 'chai'
import token from './token'
import moment from 'moment'

describe('server/api/default/token', () => {

  it('fails with no token', async () => {

    const res = await testHandler(token)

    expect(res.status()).to.be.equal(401)
    expect(res.json().message).to.be.equal('No token')

  })

  it('fails with invlaid token', async () => {

    const req = {
      headers: {
        authorization: encode(1)
      }
    }

    const res = await testHandler(token, req)

    expect(res.status()).to.be.equal(401)
    expect(res.json().message).to.be.equal('Invalid token')

  })

  it('fails with an expired token', async () => {

    const THREE_WEEKS = 60 * 60 * 24 * 7 * 2

    const three_weeks_ago = Math.floor(Date.now() / 1000) - THREE_WEEKS

    const req = {
      headers: {
        authorization: `Bearer ${encode(1, three_weeks_ago)}`
      }
    }

    const res = await testHandler(token, req)

    expect(res.status()).to.be.equal(401)
    expect(res.json().message).to.be.equal('Expired token')

  })

  it('fails with an invalid user', async () => {

    const req = {
      headers: {
        authorization: `Bearer ${encode(9999)}`
      }
    }

    const res = await testHandler(token, req)

    expect(res.status()).to.be.equal(401)
    expect(res.json().message).to.be.equal('Invalid user')

  })

  it('load the user with a valid token', async () => {

    const req = {
      headers: {
        authorization: `Bearer ${encode(1)}`
      }
    }

    const res = await testHandler(token, req)

    expect(res.status()).to.be.null

  })

})
