import {jsonObjCopy} from "../utils/misc";

export default class CodeSample {
  constructor({ title, content, mainCategory, alias }) {
    const contentAsArray = content.split("");
    const contentLen = contentAsArray.length;

    this.initialState = {
      codeArea: {
        cursorIndex: 0,
        timeCountingDelay: 0
      },

      currentCodeSample: {
        id: Math.random().toString(36).slice(2),
        title,
        alias,
        mainCategory,
        content,
        contentAsArray,
        contentLen,
        createdAt: new Date().getTime()
      },

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
