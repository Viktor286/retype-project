import { createStore } from "redux";
import combinedReducers from "./model/reducers/combinedReducers";

const configureStore = () => {
  const store = createStore(combinedReducers);

  if (window.debugLogConfig["redux-log"]) {
    console.log("Redux store debug logging is ON ");
    store.dispatch = addLoggingToDispatch(store);
  }

  return store;
};

const addLoggingToDispatch = store => {
  /* eslint-disable no-console */
  const rawDispatch = store.dispatch;
  return action => {
    console.group(action.type);
    console.log("%c prev state", "color: gray", store.getState());
    console.log("%c action", "color: blue", action);
    const returnValue = rawDispatch(action);
    console.log("%c next state", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

export default configureStore;
