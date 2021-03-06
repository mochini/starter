import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import datefield from './datefield'
import * as actions from './actions'

export default Factory({
  namespace: 'datefield',
  component: datefield,
  reducer,
  actions
})
