import { Factory } from 'redux-rubberstamp'
import reducer from './reducer'
import VideoField from './videofield'
import * as actions from './actions'

export default Factory({
  namespace: 'videofield',
  component: VideoField,
  reducer,
  actions
})
