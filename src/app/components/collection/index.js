import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import collection from './collection'
import * as actions from './actions'

export default Factory({
  namespace: 'collection',
  component: collection,
  reducer,
  actions
})