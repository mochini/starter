import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import videofield from './videofield'
import * as actions from './actions'

export default Factory({
  namespace: 'videofield',
  component: videofield,
  reducer,
  actions
})
