import Queue from '../core/queue'
import { sendMail } from '../lib/email'

const queue = new Queue({

  name: 'mailer',

  process: async (job) => {

    await sendMail(job.data)

  }

})

export default queue
