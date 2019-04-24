import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import Uploader from './uploader'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'uploader',
  component: Uploader,
  reducer,
  actions,
  selectors
})
