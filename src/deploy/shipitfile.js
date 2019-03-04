const utils = require('shipit-utils')
const path = require('path')

module.exports = shipit => {

  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: '',
      repositoryUrl: '',
      key: '',
      workspace: path.resolve('repo'),
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      strict: 'no'
    },
    production: {
      servers: ''
    }
  })

}
