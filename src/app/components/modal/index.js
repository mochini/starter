import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import modal from './modal'
import * as actions from './actions'

export default Singleton({
  namespace: 'modal',
  component: modal,
  reducer,
  actions
})
