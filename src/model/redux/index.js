import { createStore } from "redux";
import { combineReducers } from "redux";
import { auth } from "./auth";
import { correctness } from "./correctness";

export const reducers = combineReducers({
  auth,
  correctness,
});

const initStore = () => {
  return createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default initStore;
