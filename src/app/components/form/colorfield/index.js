import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import colorfield from './colorfield'
import * as actions from './actions'

export default Factory({
  namespace: 'colorfield',
  component: colorfield,
  reducer,
  actions
})
