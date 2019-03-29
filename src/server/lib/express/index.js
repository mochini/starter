import 'express-async-errors'
import JsonResponder from './json_responder'
import XlsxResponder from './xlsx_responder'
import XmlResponder from './xml_responder'
import CsvResponder from './csv_responder'
import express from 'express'
import _ from 'lodash'

const getResponderClass = (req) => {
  if(_.includes(['xml'], req.format)) return XmlResponder
  if(_.includes(['xls','xlsx'], req.format)) return XlsxResponder
  if(_.includes(['tsv','csv'], req.format)) return CsvResponder
  return JsonResponder
}

express.response.respond = function(data, serializer) {
  const responderClass = getResponderClass(this.req)
  const responder =  new responderClass(this, data, serializer)
  responder.render()
}

export default express
