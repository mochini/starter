import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Search from './search'
import * as actions from './actions'

export default Factory({
  namespace: 'search',
  component: Search,
  reducer,
  actions
})
