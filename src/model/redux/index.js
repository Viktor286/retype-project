import { createStore } from "redux";
import { combineReducers } from "redux";
import { auth } from "./auth";
import { correctnessReducer as correctness } from "./correctness";
import { statsReducer as stats } from "./stats";

export const reducers = combineReducers({
  auth,
  correctness,
  stats,
});

const initStore = () => {
  return createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default initStore;
