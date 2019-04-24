import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Electron from './electron'
import * as actions from './actions'

export default Singleton({
  namespace: 'electron',
  component: Electron,
  reducer,
  actions
})
