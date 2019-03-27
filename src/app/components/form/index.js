import { Singleton } from 'redux-rubberstamp'
import form from './form'
import * as actions from './actions'
import reducer from './reducer'

export default Singleton({
  namespace: 'form',
  component: form,
  actions,
  reducer
})
