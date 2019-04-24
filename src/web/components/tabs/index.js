import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Tabs from './tabs'
import * as actions from './actions'

export default Factory({
  namespace: 'tabs',
  component: Tabs,
  reducer,
  actions
})
