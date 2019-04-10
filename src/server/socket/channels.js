const channels = async (io, socket) => {

  socket.on('join', async (channel) => {
    socket.join(channel)
    // const authenticated = await authenticate(token)
    // if(!authenticated) return
    // const result = await Promise.map(channels, async channel => {
    //   if(!authorize(channel)) {
    //     socket.join(channel)
    //     authorized.push(channel)
    //   }
    //   return channel
    // })
    // socket.emit('join', result)
  })

  socket.on('leave', async (channel) => {
    socket.leave(channel)
    // const authenticated = await authenticate(token)
    // if(!authenticated) return
    // const result = await Promise.map(channels, async channel => {
    //   if(!authorize(channel)) {
    //     socket.join(channel)
    //     authorized.push(channel)
    //   }
    //   return channel
    // })
    // socket.emit('join', result)
  })

}

export default channels
