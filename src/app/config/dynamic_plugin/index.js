import glob from 'glob'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const scriptPath = path.resolve('tmp', 'index.js')

const stylePath = path.resolve('tmp', 'index.less')

class DynamicPlugin {

  constructor() {}

  apply(compiler) {

    const style = (file) => {

      const styles = glob.sync('src/app/**/style.less').map(style => {

        return path.resolve(style)

      })

      const template = fs.readFileSync(path.join(__dirname, 'index.less.ejs'), 'utf8')

      const data = ejs.render(template, { styles })

      fs.writeFileSync(stylePath, data, 'utf8')

    }

    const script = (file) => {

      const components = glob.sync('src/app/components/**/reducer.js').map(style => ({
        name: path.basename(style.replace('/reducer.js', '')),
        path: style.replace('/reducer.js', '')
      }))

      const root = path.resolve()

      const template = fs.readFileSync(path.join(__dirname, 'index.js.ejs'), 'utf8')

      const data = ejs.render(template, { root, components })

      fs.writeFileSync(scriptPath, data, 'utf8')

    }

    const create = (file) => {

      if(!file || file.match(/^.*\.less/)) style(file)

      if(!file || file.match(/^.*\.js/)) script(file)


    }

    compiler.hooks.afterEnvironment.tap('DynamicPlugin', create)

    compiler.hooks.invalid.tap('DynamicPlugin', create)

  }

}

export default DynamicPlugin
