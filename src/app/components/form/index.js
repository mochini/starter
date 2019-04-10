import { Singleton } from 'redux-rubberstamp'
import Form from './form'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'form',
  component: Form,
  actions,
  reducer
})
