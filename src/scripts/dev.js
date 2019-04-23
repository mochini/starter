import '../server/lib/environment'
import webConfig from '../app/config/webpack.development.config'
import mobileConfig from '../cordova/config/webpack.config'
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

const mobileWatch = async () => {

  const mobilePath = path.resolve('src','cordova','app')

  const recompile = (event, path) => {

    log('info', 'cordova', 'Compiling...')

    webpack(mobileConfig).run((err, stats) => {

      if(err) console.log(err)

      log('info', 'cordova', 'Compiled successfully.')

    })

  }

  chokidar.watch(mobilePath).on('all', (event, path) => {

    if(!_.includes(['add','change'], event)) return

    console.log(event, path)

    recompile()
  })

}

const clientWatch = () => {

  const devserver = new devServer(webpack(webConfig), {
    contentBase: path.join('src', 'app', 'public'),
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

  await mobileWatch()

  await clientWatch()

}

dev()
