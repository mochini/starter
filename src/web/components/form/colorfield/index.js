import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import ColorField from './colorfield'
import * as actions from './actions'

export default Factory({
  namespace: 'colorfield',
  component: ColorField,
  reducer,
  actions
})
