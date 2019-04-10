import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Searchbox from './searchbox'
import * as actions from './actions'

export default Factory({
  namespace: 'searchbox',
  component: Searchbox,
  reducer,
  actions
})
