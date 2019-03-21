import { sendMail } from '../utils/email'
import Queue from '../core/queue'

const process = async (job) => {

  return await sendMail(job.data)

}

const queue = new Queue({
  name: 'mailer',
  process
})

export default queue
