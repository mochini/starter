import { Singleton } from 'redux-rubberstamp'
import reducer from './reducer'
import uploader from './uploader'
import * as actions from './actions'
import * as selectors from './selectors'

export default Singleton({
  namespace: 'uploader',
  component: uploader,
  reducer,
  actions,
  selectors
})
