import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Network from './network'
import * as selectors from './selectors'
import * as actions from './actions'

export default Singleton({
  namespace: 'network',
  component: Network,
  reducer,
  selectors,
  actions
})
