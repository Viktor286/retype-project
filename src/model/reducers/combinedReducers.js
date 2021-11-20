import { combineReducers } from "redux";
import { codeSamples, codeSamplesIndex } from "./codeSamples";
import userStat from "./userStat";

const combinedReducers = combineReducers({
  codeSamplesIndex,
  codeSamples,
  userStat
});

export default combinedReducers;
