import { testHandler } from '../../utils/test'
import User from '../../models/user'
import { expect } from 'chai'
import show from './show'

describe('src/server/api/session/show', () => {

  it('rejects non signed in user', async () => {

    const res = await testHandler(show)

    expect(res.status()).to.be.equal(404)
    expect(res.json().message).to.be.equal('You are not signedin')

  })

  it('returns a serialized session', async () => {

    const user = await User.where('id', 1).fetch({
      transacting: global.knex
    })

    const req = { user }

    const res = await testHandler(show, req)

    expect(res.status()).to.be.equal(200)
    expect(res.json().data.user.id).to.be.equal(user.get('id'))
    expect(res.json().data.user.full_name).to.be.equal(user.get('full_name'))
    expect(res.json().data.user.email).to.be.equal(user.get('email'))
    expect(res.json().data.token).to.be.not.null

  })

})
