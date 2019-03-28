import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import selectfield from './selectfield'
import * as actions from './actions'

export default Factory({
  namespace: 'selectfield',
  component: selectfield,
  reducer,
  actions
})
