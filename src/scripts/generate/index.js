import pluralize from 'pluralize'
import moment from 'moment'
import dotenv from 'dotenv'
import mkdirp from 'mkdirp'
import chalk from 'chalk'
import path from 'path'
import _ from 'lodash'
import ejs from 'ejs'
import fs from 'fs'

dotenv.load({ path: path.join('.env') })

const createFile = (filepath, templateName, data = {}) => {
  if(fs.existsSync(filepath)) return console.log(chalk.cyan('exists'), chalk.white(filepath))
  const templatepath = path.join(__dirname, `${templateName}.ejs`)
  const template = fs.readFileSync(templatepath, 'utf8')
  const source = ejs.render(template, data)
  mkdirp.sync(path.join(...filepath.split('/').slice(0,-1)))
  fs.writeFileSync(filepath, source)
  console.log(chalk.green('create'), chalk.white(filepath))
}

const route = async (args) => {
  const [ pathname ] = args
  const root = path.join('src','server','api')
  const data = {
    routeName: pathname.split('/').slice(-1)[0],
    routePath: path.join(root,`${pathname}.js`),
    testPath: path.join(root,`${pathname}_test.js`)
  }
  createFile(data.routePath, 'route/route.js', data)
  createFile(data.testPath, 'route/test.js', data)
}

const model = async (args) => {
  const [ model ] = args
  const root = path.join('src', 'server')
  const timestamp = moment().format('YYYYMMDDhhmmss')
  const singluar = pluralize.singular(model).toLowerCase()
  const plural = pluralize.plural(model).toLowerCase()
  const className = _.upperFirst(_.camelCase(singluar))
  const tableName = _.snakeCase(plural)
  const modelName = _.snakeCase(singluar)
  const data = {
    className, tableName, modelName,
    fixturesPath: path.join(root, 'db', 'fixtures', `${timestamp}_${tableName}.js`),
    migrationPath: path.join(root, 'db', 'migrations', `${timestamp}_create_${tableName}.js`),
    modelPath: path.join(root, 'models', `${modelName}.js`),
    testPath: path.join(root, 'models', `${modelName}_test.js`)
  }
  createFile(data.modelPath, 'model/model.js', data)
  createFile(data.migrationPath, 'model/migration.js', data)
  createFile(data.fixturesPath, 'model/fixtures.js', data)
  createFile(data.testPath, 'model/test.js', data)
}

const component = async (args) => {
  const [ pathname ] = args
  const rootPath = path.join('src','app','components',pathname)
  const componentName = _.snakeCase(pathname.split('/').slice(-1)[0])
  const className = _.upperFirst(_.camelCase(componentName))
  const styleName = _.kebabCase(componentName)
  const data = {
    rootPath, componentName, className, styleName,
    componentPath: path.join(rootPath, 'index.js'),
    testPath: path.join(rootPath, 'test.js'),
    stylePath: path.join(rootPath, 'style.less')
  }
  createFile(data.componentPath, 'component/component.js', data)
  createFile(data.testPath, 'component/test.js', data)
  createFile(data.stylePath, 'component/style.less', data)
}

const rubberstamp = async (args) => {
  const [ pathname ] = args
  const rootPath = path.join('src','app','components',pathname)
  const componentName = _.snakeCase(pathname.split('/').slice(-1)[0])
  const className = _.upperFirst(_.camelCase(componentName))
  const styleName = _.kebabCase(componentName)
  const data = {
    rootPath, componentName, className, styleName,
    actionsPath: path.join(rootPath, 'actions.js'),
    selectorsPath: path.join(rootPath, 'selectors.js'),
    reducerPath: path.join(rootPath, 'reducer.js'),
    indexPath: path.join(rootPath, 'index.js'),
    componentPath: path.join(rootPath, `${componentName}.js`),
    testPath: path.join(rootPath, 'test.js'),
    stylePath: path.join(rootPath, 'style.less')
  }
  createFile(data.actionsPath, 'rubberstamp/actions.js', data)
  createFile(data.selectorsPath, 'rubberstamp/selectors.js', data)
  createFile(data.reducerPath, 'rubberstamp/reducer.js', data)
  createFile(data.indexPath, 'rubberstamp/index.js', data)
  createFile(data.componentPath, 'rubberstamp/component.js', data)
  createFile(data.testPath, 'rubberstamp/test.js', data)
  createFile(data.stylePath, 'rubberstamp/style.less', data)
}

const page = async (args) => {
  const [ pathname ] = args
  const root = path.join('src','app','pages')
  const data = {
    pagePath: path.join(root,`${pathname}.js`)
  }
  createFile(data.pagePath, 'page/page.js', data)
}

const generate = async () => {
  const argv = process.argv.slice(2)
  const template = argv[0]
  const args = argv.slice(1)
  if(template === 'route') return route(args)
  if(template === 'model') return model(args)
  if(template === 'component') return component(args)
  if(template === 'rubberstamp') return rubberstamp(args)
  if(template === 'page') return page(args)
}

generate().then(() => process.exit())
