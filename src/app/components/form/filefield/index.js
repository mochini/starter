import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import FileField from './filefield'
import * as selectors from './selectors'
import * as actions from './actions'

export default Factory({
  namespace: 'filefield',
  component: FileField,
  reducer,
  selectors,
  actions
})
