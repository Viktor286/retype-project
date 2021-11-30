import {codingAreaModifier} from "./codingAreaModifier";
import {debugLog, jsonObjCopy} from "../../utils/misc";

export default function updateCodingAreaState({ action, codeTrainer }) {
  if (codeTrainer.characterCorrectness.isComplete) {
    return true;
  }

  codeTrainer.setState(prevState => {
    const newCodingAreaState = codingAreaModifier(prevState, action);

    if (
      // that codeSample has just been completed
      !prevState.characterCorrectness.isComplete &&
      newCodingAreaState.characterCorrectness.isComplete
    ) {
      debugLog({event: "codeSampleComplete", color: "violet"}, prevState);

      // updateTodaySessionUserStat(newCodingAreaState, userStat);

      let activeStateCompleted = jsonObjCopy(codeTrainer);
      activeStateCompleted.characterCorrectness.isComplete = true;
      // TODO redux middleware to save to localStore by flag
    }

    return newCodingAreaState;
  });
}
