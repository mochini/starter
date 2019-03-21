import inspector from 'inspector'

inspector.open()

require('../server/server')

require('../server/worker')
