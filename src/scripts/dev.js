import '../server/lib/environment'
import '../server'

import devServer from 'webpack-dev-server'
import config from '../app/config/webpack.development.config'
import Webpack from 'webpack'
import path from 'path'

const devserver = new devServer(Webpack(config()), {
  contentBase: path.join('src', 'public'),
  compress: true,
  hot: true,
  stats: 'errors-only',
  watchContentBase: true,
  open: true,
  proxy: {
    '/api/*': 'http://localhost:3001'
  },
  historyApiFallback: {
    disableDotRule: true,
    rewrites: [
      { from: /.*/, to: 'index.html' }
    ]
  }
})

devserver.listen(3000, {}, () => {
  console.info('Webpack DevServer listening on 3000')
})
