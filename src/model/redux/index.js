import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { auth } from './auth';
import { correctnessReducer as correctness } from './correctness';
import { statsReducer as stats } from './stats';
import { sampleReducer as sample } from './sample';
import { uiReducer as ui } from './ui';
import { userSettingsReducer as userSettings } from './userSettings';
import { eventsReducer as events } from './events';

export const reducer = combineReducers({
  auth,
  correctness,
  stats,
  sample,
  ui,
  userSettings,
  events,
});

const initStore = () => {
  return configureStore(
    { reducer },
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default initStore;
