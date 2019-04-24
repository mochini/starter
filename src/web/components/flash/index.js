import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Flash from './flash'
import * as actions from './actions'

export default Singleton({
  namespace: 'flash',
  component: Flash,
  reducer,
  actions
})
