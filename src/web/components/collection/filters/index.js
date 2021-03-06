import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import filters from './filters'
import * as actions from './actions'

export default Singleton({
  namespace: 'filters',
  component: filters,
  reducer,
  actions
})
