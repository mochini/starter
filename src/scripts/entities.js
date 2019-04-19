import inspector from 'inspector'

inspector.open()

require('../server/cron')

require('../server/server')

require('../server/worker')
