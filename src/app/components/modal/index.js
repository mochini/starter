import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Modal from './modal'
import * as actions from './actions'

export default Singleton({
  namespace: 'modal',
  component: Modal,
  reducer,
  actions
})
