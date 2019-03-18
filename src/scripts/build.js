import { transform } from 'babel-core'
import rimraf from 'rimraf'
import mkdirp from 'mkdirp'
import dotenv from 'dotenv'
import path from 'path'
import ncp from 'ncp'
import fs from 'fs'

dotenv.load({ path: path.join('.env') })

const copy = (src, dest) => Promise.promisify(ncp)(src, dest)

const transpile = (source) => {

  const transpiled = transform(source, {
    presets: [
      'babel-preset-es2015',
      'babel-preset-stage-0'
    ],
    plugins: [
      'transform-promise-to-bluebird',
      ['transform-runtime', { polyfill: false }]
    ]
  })

  return transpiled.code

}

const compilePath = async (base) => {

  const dest = base.replace('src/server', 'dist')

  mkdirp.sync(dest)

  await Promise.map(fs.readdirSync(base), async (entity) => {

    const entityPath = path.join(base, entity)

    if(fs.lstatSync(entityPath).isDirectory()) return await compilePath(entityPath)

    if(path.extname(entityPath) !== '.js') return await copy(entityPath, path.join(dest, entity))

    fs.writeFileSync(path.join(dest, entity), transpile(fs.readFileSync(entityPath, 'utf8')))

  })

}

const compile = async () => {

  console.log('Building code')

  rimraf.sync(path.join('dist'))

  await compilePath(path.join('src','server'))

}

compile().then(process.exit)
