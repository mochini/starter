import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Drawer from './drawer'
import * as actions from './actions'

export default Singleton({
  namespace: 'drawer',
  component: Drawer,
  reducer,
  actions
})
