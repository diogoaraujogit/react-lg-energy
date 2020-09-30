import { combineReducers } from 'redux';

import device from './device/reducer'
import analytics from './analytics/reducer'

export default combineReducers({
  device,
  analytics
});