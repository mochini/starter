import Emitter from 'socket.io-emitter'
import _ from 'lodash'

const emitter = Emitter(process.env.REDIS_URL)

export const refresh = async (channels) => {

  await Promise.map(_.castArray(channels), async (channel) => {

    console.log('refreshing', channel)

    await emitter.in(channel).emit('message', {
      channel,
      action: 'refresh'
    })

  })

}
