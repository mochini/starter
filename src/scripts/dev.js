import '../server/lib/environment'
import webConfig from '../web/config/webpack.development.config'
import desktopConfig from '../desktop/config/webpack.config'
import mobileConfig from '../mobile/config/webpack.config'
import devServer from 'webpack-dev-server'
import { spawn } from 'child_process'
import chokidar from 'chokidar'
import webpack from 'webpack'
import chalk from 'chalk'
import path from 'path'
import _ from 'lodash'

const log = (...options) => {
  const style = options[0] === 'error' ? chalk.red('e') : chalk.blue('i')
  const service = chalk.grey(`[${options[1]}]`)
  const message = chalk.white(`: ${options[2]}`)
  process.stdout.write(`${style} ${service} ${message}\n`)
}

const serverWatch = async () => {

  const proc = spawn('nodemon', [
    path.resolve('src','scripts','entities.js'),
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

const desktopWatch = async () => {
  let compiling = false
  chokidar.watch(path.resolve('src', 'desktop', 'app')).on('all', (event, path) => {
    if(compiling) return
    if(!_.includes(['add','change'], event)) return
    compiling = true
    log('info', 'desktop', 'Compiling...')
    webpack(desktopConfig).run((err, stats) => {
      compiling = false
      if(err) return log('error', 'mobile', err)
      log('info', 'desktop', 'Compiled successfully.')
    })
  })
}

const mobileWatch = async () => {
  let compiling = false
  chokidar.watch(path.resolve('src', 'mobile', 'app')).on('all', (event, path) => {
    if(compiling) return
    if(!_.includes(['add','change'], event)) return
    compiling = true
    log('info', 'mobile', 'Compiling...')
    webpack(mobileConfig).run((err, stats) => {
      compiling = false
      if(err) return log('error', 'mobile', err)
      log('info', 'mobile', 'Compiled successfully.')
    })
  })
}

const webWatch = () => {

  const devserver = new devServer(webpack(webConfig), {
    contentBase: path.join('src', 'web', 'public'),
    compress: true,
    hot: true,
    stats: 'errors-only',
    watchContentBase: true,
    open: true,
    proxy: {
      '/api/*': 'http://localhost:3001',
      '/imagecache/*': 'http://localhost:3001',
      '/jobs/*': 'http://localhost:3001',
      '/locales/*': 'http://localhost:3001',
      '/socket': {
        target: 'http://localhost:3001',
        ws: true
      }
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
  await desktopWatch()
  await mobileWatch()
  await webWatch()
}

dev()
