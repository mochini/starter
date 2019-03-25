import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import menu from './menu'
import * as actions from './actions'

export default Singleton({
  namespace: 'menu',
  component: menu,
  reducer,
  actions
})
