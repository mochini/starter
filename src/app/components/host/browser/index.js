import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Browser from './browser'
import * as actions from './actions'

export default Singleton({
  namespace: 'browser',
  component: Browser,
  reducer,
  actions
})
