import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Tasks from './tasks'
import * as actions from './actions'

export default Singleton({
  namespace: 'tasks',
  component: Tasks,
  reducer,
  actions
})
