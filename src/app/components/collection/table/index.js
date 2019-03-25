import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import table from './table'
import * as actions from './actions'

export default Factory({
  namespace: 'table',
  component: table,
  reducer,
  actions
})
