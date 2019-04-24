import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Collection from './collection'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'collection',
  component: Collection,
  reducer,
  actions,
  selectors
})
