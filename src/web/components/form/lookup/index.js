import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Lookup from './lookup'
import * as actions from './actions'

export default Factory({
  namespace: 'lookup',
  component: Lookup,
  reducer,
  actions
})
