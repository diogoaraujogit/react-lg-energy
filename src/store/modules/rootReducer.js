import { combineReducers } from 'redux';

import device from './device/reducer'
import analytics from './analytics/reducer'
import logs from './logs/reducer'

export default combineReducers({
  device,
  analytics,
  logs
});