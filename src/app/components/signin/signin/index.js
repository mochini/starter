import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Signin from './signin'
import * as actions from './actions'

export default Singleton({
  namespace: 'signin',
  component: Signin,
  reducer,
  actions
})
