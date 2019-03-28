import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import browser from './browser'
import * as actions from './actions'

export default Singleton({
  namespace: 'browser',
  component: browser,
  reducer,
  actions
})
