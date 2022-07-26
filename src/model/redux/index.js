import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { auth } from './auth';
import { correctnessReducer as correctness } from './correctness';
import { statsReducer as stats } from './stats';
import { sampleReducer as sample } from './sample';
import { uiReducer as ui } from './ui';
import { userSettingsReducer as userSettings } from './userSettings';

export const reducer = combineReducers({
  auth,
  correctness,
  stats,
  sample,
  ui,
  userSettings,
});

const initStore = () => {
  return configureStore(
    { reducer },
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default initStore;
