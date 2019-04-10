import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Reset from './reset'
import * as actions from './actions'

export default Singleton({
  namespace: 'reset',
  component: Reset,
  reducer,
  actions
})
