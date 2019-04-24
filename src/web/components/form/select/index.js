import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import Select from './select'
import * as actions from './actions'

export default Factory({
  namespace: 'select',
  component: Select,
  reducer,
  actions
})
