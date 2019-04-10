import channels from './channels'

const socket = async (io, socket) => {

  await channels(io, socket)

}

export default socket
