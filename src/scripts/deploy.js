import '../server/lib/environment'
import shipitfile from '../deploy/shipitfile'
import Shipit from 'shipit-cli'
import mkdirp from 'mkdirp'
import path from 'path'

const deploy = async () => {

  mkdirp.sync(path.join('repo'))

  const shipit = new Shipit({ environment: 'production' })

  shipitfile(shipit)

  shipit.initialize()

  shipit.start('deploy')

  shipit.on('err', () => process.exit(1))

  shipit.on('task_err', () => process.exit(1))

  shipit.on('task_not_found', () => process.exit(1))

}

deploy()
