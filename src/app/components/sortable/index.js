import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import sortable from './sortable'
import * as actions from './actions'

export default Factory({
  namespace: 'sortable',
  component: sortable,
  reducer,
  actions
})
