import { assembleAsset } from '../services/assets'
import Queue from '../core/queue'

const process = async (job) => {

  return await assembleAsset(job.id, job.trx)

}

const queue = new Queue({
  name: 'assemble_asset',
  process
})

export default queue
