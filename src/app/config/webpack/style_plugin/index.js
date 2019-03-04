import glob from 'glob'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'

const stylePath = path.resolve('tmp', 'index.less')

class StylePlugin {

  constructor() {}

  apply(compiler) {

    const create = (file) => {

      if(file && !file.match(/^.*\.less/)) return

      const styles = glob.sync('src/app/**/style.less').map(style => {

        return path.resolve(style)

      })

      const template = fs.readFileSync(path.join(__dirname, 'index.less.ejs'), 'utf8')

      const data = ejs.render(template, { styles })

      fs.writeFileSync(stylePath, data, 'utf8')

    }

    compiler.hooks.afterEnvironment.tap('StylePlugin', create)

    compiler.hooks.invalid.tap('StylePlugin', create)

  }

}

export default StylePlugin
