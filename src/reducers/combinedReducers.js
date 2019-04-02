import { combineReducers } from "redux";
import codeSamples from "./codeSamples";

const combinedReducers = combineReducers({
  codeSamples: codeSamples
});

export default combinedReducers;
