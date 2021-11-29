import {jsonObjCopy} from "../utils/misc";

export default class CodingSession {
  constructor({ content, currentCodeSample }) {
    const contentAsArray = content.split("");
    const contentLen = contentAsArray.length;

    this.initialState = {
      codeArea: {
        cursorIndex: 0,
        timeCountingDelay: 0
      },

      currentCodeSample,

      characterCorrectness: {
        map: new Array(contentLen).fill(0),
        keysLeft: contentLen,
        keysSuccess: 0,
        keysLeftPercent: 0,
        isComplete: false,
        cpm: 0,
        timeCounted: 0,
        corrections: 0,
        mistakes: 0
      },

      userStat: {
        lastCompletion: {
          cpm: 0,
          timeCounted: 0,
          corrections: 0,
          mistakes: 0,
          timestamp: 0
        },
        completionsHistory: []
      }
    };

    this.activeState = jsonObjCopy(this.initialState);
  }
}
