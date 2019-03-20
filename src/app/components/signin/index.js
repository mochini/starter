import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import signin from './signin'
import * as actions from './actions'

export default Singleton({
  namespace: 'signin',
  component: signin,
  reducer,
  actions
})
