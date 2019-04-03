import { combineReducers } from "redux";
import codeSamples from "./codeSamples";
import userStat from "./userStat";

const combinedReducers = combineReducers({
  codeSamples,
  userStat
});

export default combinedReducers;
