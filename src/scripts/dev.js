import '../server/lib/environment'
import config from '../app/config/webpack.development.config'
import devServer from 'webpack-dev-server'
import { spawn } from 'child_process'
import Webpack from 'webpack'
import chalk from 'chalk'
import path from 'path'

const log = (...options) => {
  const style = options[0] === 'error' ? chalk.red('e') : chalk.blue('i')
  const service = chalk.grey(`[${options[1]}]`)
  const message = chalk.white(`: ${options[2]}`)
  process.stdout.write(`${style} ${service} ${message}\n`)
}

const serverWatch = async () => {

  const proc = spawn('nodemon', [
    path.resolve('src','scripts','server.js'),
    '--color',
    '--quiet',
    '--exec',
    'babel-node',
    '--watch',
    path.resolve('src','server')
  ], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  })


  proc.on('message', function (event) {
    if(event.type === 'start') {
      log('info', 'nodemon', 'Compiling...')
    }
  })

  proc.stdout.on('data', function (data) {
    log('info', 'nodemon', data.toString().replace('\n',''))
  })

  proc.stderr.on('data', function (err) {
    log('error', 'nodemon', err.toString())
  })

}

const clientWatch = () => {

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

  devserver.listen(3000, null, () => {
    log('info', 'wdm', 'Listening on 3000')
  })

}

export const dev = async () => {

  await serverWatch()

  await clientWatch()

}

dev()
