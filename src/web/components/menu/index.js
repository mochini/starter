import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Menu from './menu'
import * as actions from './actions'

export default Singleton({
  namespace: 'menu',
  component: Menu,
  reducer,
  actions
})
