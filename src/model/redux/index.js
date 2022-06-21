import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { auth } from './auth';
import { correctnessReducer as correctness } from './correctness';
import { statsReducer as stats } from './stats';
import { sampleReducer as sample } from './sample';
import { uiReducer as ui } from './ui';

export const reducer = combineReducers({
  auth,
  correctness,
  stats,
  sample,
  ui,
});

const initStore = () => {
  return configureStore(
    { reducer },
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default initStore;
