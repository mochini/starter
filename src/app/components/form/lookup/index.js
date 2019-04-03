import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import lookup from './lookup'
import * as actions from './actions'

export default Factory({
  namespace: 'lookup',
  component: lookup,
  reducer,
  actions
})
