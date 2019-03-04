import glob from 'glob'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const scriptPath = path.resolve('tmp', 'index.js')

class ScriptPlugin {

  constructor() {}

  apply(compiler) {

    const create = (file) => {

      if(file && !file.match(/^.*\.less/)) return

      const components = glob.sync('src/app/components/**/reducer.js').map(style => ({
        name: path.basename(style.replace('/reducer.js', '')),
        path: style.replace('/reducer.js', '')
      }))

      const root = path.resolve()

      const template = fs.readFileSync(path.join(__dirname, 'index.js.ejs'), 'utf8')

      const data = ejs.render(template, { root, components })

      fs.writeFileSync(scriptPath, data, 'utf8')

    }

    compiler.hooks.afterEnvironment.tap('ScriptPlugin', create)

    compiler.hooks.invalid.tap('ScriptPlugin', create)

  }

}

export default ScriptPlugin
