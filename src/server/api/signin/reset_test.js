import mailer from '../../queues/mailer_queue'
import { testHandler } from '../../utils/test'
import { expect } from 'chai'
import reset from './reset'

describe('api/signin/reset', () => {

  it('requires an email', async () => {

    const req = {
      body: {}
    }

    const res = await testHandler(reset, req)

    expect(res.status()).to.be.equal(422)
    expect(res.json().errors.email[0]).to.be.equal('The email is required')

  })

  it('cannot find non existant user', async () => {

    const req = {
      body: {
        email: 'jerrygarcia@gmail.com'
      }
    }

    const res = await testHandler(reset, req)

    expect(res.status()).to.be.equal(404)
    expect(res.json().errors.email[0]).to.be.equal('Could not find user')

  })

  it('can reset password for existing user', async () => {

    const req = {
      body: {
        email: 'johndoe@gmail.com'
      }
    }

    const res = await testHandler(reset, req)

    const jobs = await mailer.queue.getJobs()

    const email = jobs[0].data

    expect(res.status()).to.be.equal(200)
    expect(jobs.length).to.be.equal(1)
    expect(email.to).to.be.equal('John Doe <johndoe@gmail.com>')
    expect(email.subject).to.be.equal('Your password has been reset')
    expect(email.template).to.be.equal('reset')
    expect(email.data.user.first_name).to.be.equal('John')
    expect(email.data.token).to.be.not.null
    expect(res.json().message).to.be.equal('Email was sent')

  })

})
