import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Sortable from './sortable'
import * as actions from './actions'

export default Factory({
  namespace: 'sortable',
  component: Sortable,
  reducer,
  actions
})
