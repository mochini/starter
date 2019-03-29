import moment from 'moment'
import _ from 'lodash'

class Responder {

  req = null
  res = null
  pagination = null
  data = null
  serializer = null

  constructor(res, data, serializer) {
    this.res = res
    this.req = res.req
    this.pagination = data.pagination
    this.data = data.pagination ? data.map(serializer) : serializer(data)
    this.filename = this._getFilename()
  }

  async render() {
    const data = this._getData()
    if(this.req.query.download) {
      this.res.setHeader('Content-disposition', `attachment; filename=${this.filename}`)
    }
    this.res.type(this.type).send(data)
  }

  _getFilename() {
    const filename = this.req.query.filename || 'export'
    const datestamp = moment().format('YYYYMMDDHHmmss')
    return `${filename}-${datestamp}.${this.req.format}`
  }

  _getSelectedLabels(select, record) {
    if(_.isPlainObject(select)) return Object.keys(select)
    if(_.isNil(select)) return this._flattenKeys(record)
    return _.castArray(select)
  }

  _getSelectedKeys(select, record) {
    if(_.isPlainObject(select)) return Object.values(select)
    if(_.isNil(select)) return this._flattenKeys(record)
    return _.castArray(select)
  }

  _flattenKeys(hash, prefix = '') {
    return Object.keys(hash).reduce((keys, key) => [
      ...keys,
      ..._.isPlainObject(hash[key]) ? this._flattenKeys(hash[key], `${prefix}${key}.`) : [`${prefix}${key}`]
    ], [])
  }

}

export default Responder
