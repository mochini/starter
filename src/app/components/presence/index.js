import { Singleton } from 'redux-rubberstamp'
import Presence from './presence'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'presence',
  component: Presence,
  actions,
  reducer
})
