import { combineReducers } from 'redux';

import device from './device/reducer'
import analytics from './analytics/reducer'
import logs from './logs/reducer'
import group from './group/reducer'
import intl from './intl/reducer'

export default combineReducers({
  device,
  analytics,
  logs,
  group,
  intl
});