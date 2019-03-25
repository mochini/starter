import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import daterange from './daterange'
import * as actions from './actions'

export default Factory({
  namespace: 'filters:daterange',
  component: daterange,
  reducer,
  actions
})
