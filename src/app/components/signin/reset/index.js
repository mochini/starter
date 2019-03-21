import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import reset from './reset'
import * as actions from './actions'

export default Singleton({
  namespace: 'reset',
  component: reset,
  reducer,
  actions
})
