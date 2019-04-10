import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Assignment from './assignment'
import * as actions from './actions'
import * as selectors from './selectors'

export default Factory({
  namespace: 'assignment',
  component: Assignment,
  reducer,
  actions,
  selectors
})
