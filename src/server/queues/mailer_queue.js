import { sendMail } from '../lib/email'
import Queue from '../core/queue'

const process = async (job) => {

  await sendMail(job.data)

}

const queue = new Queue({
  name: 'mailer',
  process
})

export default queue
