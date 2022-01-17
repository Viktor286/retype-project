/**
 * Correctness map is basic state of the app.
 * It closely combined with basic stats like correctAmount, keysLeft, mistakes, isComplete for the sake of performance.
 * */

const initialState = {
  cursorIndex: [0, 0],
  prevCharState: undefined,
  correctAs2dArray: [[]],
  correctAmount: 0,
  keysLeft: 0,
  keysCompletedPercent: 0,
  isComplete: false,
  mistakes: 0,
  corrections: 0
};

// Exception constant for "correctness" entire lifetime cycle will be obtained after content initialization
let GLOBAL_CONSTANT_CODE_SAMPLE = {}

// Actions
export const CR_INIT = "CR_INIT";
export const CR_DELETE = "CR_DELETE";
export const CR_BACKSPACE = "CR_BACKSPACE";
export const CR_MATCH = "CR_MATCH";
export const CR_MISTAKE = "CR_MISTAKE";
export const CR_ONE_FORWARD = "CR_ONE_FORWARD";
export const CR_ONE_BACKWARD = "CR_ONE_BACKWARD";
// export const JUMP_TO = "JUMP_TO";

export const initCorrectness = () => ({
  type: CR_INIT,
});

export const updateCorrectness = type => ({
  type,
});

const CHAR_STATE = {
  NO_CHANGE: null,
  RESET: 0,
  SUCCESS: 1,
  MISTAKE: 2,
};

export function initEmptyContent2dArray(contentAs2dArray) {
  const emptyContentAs2dArray = new Array(contentAs2dArray.length);
  for (let i = 0; i < contentAs2dArray.length; i++) {
    emptyContentAs2dArray[i] = new Array(contentAs2dArray[i].length).fill(0);
  }
  return emptyContentAs2dArray;
}

// prev
function resolveStats(command, state, prevCharState, totalChars) {
  let {correctAmount, mistakes, corrections} = state || {};

  switch (command) {
    case CR_DELETE:
      if (prevCharState === CHAR_STATE.MISTAKE) {
        corrections += 1;
      }

      if (prevCharState === CHAR_STATE.SUCCESS) {
        correctAmount -= 1;
        corrections += 1;
      }
      break;
    case CR_BACKSPACE:
      if (prevCharState === CHAR_STATE.MISTAKE) {
        corrections += 1;
      }

      if (prevCharState === CHAR_STATE.SUCCESS) {
        correctAmount -= 1;
        corrections += 1;
      }
      break;
    case CR_MATCH:
      if (prevCharState !== CHAR_STATE.SUCCESS) {
        correctAmount += 1;
      }

      if (prevCharState === CHAR_STATE.MISTAKE) {
        corrections += 1;
      }
      break;
    case CR_MISTAKE:
      mistakes += 1;

      if (prevCharState === CHAR_STATE.SUCCESS) {
        correctAmount -= 1;
      }
      break;

    default:
      return {
        staleTimeout: 0,
      }
  }

  return {
    keysLeft: totalChars - correctAmount,
    keysCompletedPercent: correctAmount / (totalChars / 100),
    correctAmount,
    mistakes,
    corrections,
    isComplete: correctAmount === totalChars,
  }
}

// Reducer
export const correctnessReducer = (state = initialState, action) => {
  let stats = {};
  GLOBAL_CONSTANT_CODE_SAMPLE = window.codeTrainerApp?.codeSample || {}; // todo: can we avoid this trick effectively?
  const {cursorIndex: cursor} = state;

  switch (action.type) {
    case CR_INIT: {
      return {
        ...state,
        correctAs2dArray: initEmptyContent2dArray(GLOBAL_CONSTANT_CODE_SAMPLE.contentAs2dArray),
        cursorIndex: GLOBAL_CONSTANT_CODE_SAMPLE.skipMask2dArray[0][0] > 0 ? getNextCursor(cursor, GLOBAL_CONSTANT_CODE_SAMPLE) : cursor,
      };
    }

    case CR_DELETE: {
      const [line, char] = cursor;
      const lineAsArr = state.correctAs2dArray[line].slice(0);

      const prevCharState = lineAsArr[char];
      lineAsArr[char] = CHAR_STATE.RESET;

      stats = resolveStats(CR_DELETE, state, prevCharState, GLOBAL_CONSTANT_CODE_SAMPLE.totalChars);

      return {
        ...state,
        ...stats,
        prevCharState,
        cursorIndex: getNextCursor(cursor, GLOBAL_CONSTANT_CODE_SAMPLE),
        correctAs2dArray: insertElementIntoArray2dCopy(state.correctAs2dArray, line, lineAsArr),
      };
    }

    case CR_BACKSPACE: {
      const [line, char] = cursor;
      const lineAsArr = state.correctAs2dArray[line].slice(0);

      const prevCharState = lineAsArr[char];
      lineAsArr[char] = CHAR_STATE.RESET;

      stats = resolveStats(CR_BACKSPACE, state, prevCharState, GLOBAL_CONSTANT_CODE_SAMPLE.totalChars);

      return {
        ...state,
        ...stats,
        prevCharState,
        cursorIndex: getPrevCursor(cursor, GLOBAL_CONSTANT_CODE_SAMPLE),
        correctAs2dArray: insertElementIntoArray2dCopy(state.correctAs2dArray, line, lineAsArr),
      };
    }
    case CR_MATCH: {
      const [line, char] = cursor;
      const lineAsArr = state.correctAs2dArray[line].slice(0);

      const prevCharState = lineAsArr[char];
      lineAsArr[char] = CHAR_STATE.SUCCESS;

      stats = resolveStats(CR_MATCH, state, prevCharState, GLOBAL_CONSTANT_CODE_SAMPLE.totalChars);

      return {
        ...state,
        ...stats,
        prevCharState,
        cursorIndex: getNextCursor(cursor, GLOBAL_CONSTANT_CODE_SAMPLE),
        correctAs2dArray: insertElementIntoArray2dCopy(state.correctAs2dArray, line, lineAsArr),
      };
    }
    case CR_MISTAKE: {
      const [line, char] = cursor;
      const lineAsArr = state.correctAs2dArray[line].slice(0);

      const prevCharState = lineAsArr[char];
      lineAsArr[char] = CHAR_STATE.MISTAKE;

      stats = resolveStats(CR_MISTAKE, state, prevCharState, GLOBAL_CONSTANT_CODE_SAMPLE.totalChars);

      return {
        ...state,
        ...stats,
        prevCharState,
        cursorIndex: getNextCursor(cursor, GLOBAL_CONSTANT_CODE_SAMPLE),
        correctAs2dArray: insertElementIntoArray2dCopy(state.correctAs2dArray, line, lineAsArr),
      };
    }
    case CR_ONE_FORWARD:
      return {
        ...state,
        cursorIndex: getNextCursor(cursor, GLOBAL_CONSTANT_CODE_SAMPLE),
      };
    case CR_ONE_BACKWARD:
      return {
        ...state,
        cursorIndex: getPrevCursor(cursor, GLOBAL_CONSTANT_CODE_SAMPLE),
      };
    // case JUMP_TO:
    //   return {
    //     ...state,
    //     ...resolveStats(),
    //     cursorIndex: cursor,
    //   };
    default:
      return state;
  }
};

function isContentBoundaryRight(line, char, contentLinesLen, currentLineLen) {
  return line === contentLinesLen - 1 && char + 1 >= currentLineLen;
}

function isLineBoundaryRight(char, currentLineLen) {
  return char + 1 >= currentLineLen;
}

function isContentBoundaryLeft(line, char) {
  return line === 0 && char - 1 < 0;
}

function isLineBoundaryLeft(char) {
  return char - 1 < 0;
}

function getNextCursor(prevCursorIndex, codeSample) {
  const {skipMask2dArray, contentLinesLen} = codeSample;
  const [line, char] = prevCursorIndex;
  let currentLineLen = codeSample.contentAs2dArray[line].length;

  // End boundary
  if (isContentBoundaryRight(line, char, contentLinesLen, currentLineLen)) {
    return [line, currentLineLen - 1]; // todo: should we have final "complete" string?
  }

  // Move next
  let nextCursor = isLineBoundaryRight(char, currentLineLen) ? [line + 1, 0] : [line, char + 1];

  // Skip comments
  let nextSkipMask = skipMask2dArray[nextCursor[0]][nextCursor[1]];
  if (nextSkipMask > 0) {
    let [line, char] = nextCursor;
    while (nextSkipMask !== 0) {
      currentLineLen = codeSample.contentAs2dArray[line].length;
      if (line >= contentLinesLen - 1) {
        if (char >= currentLineLen - 1) {
          return getPrevCursor([line, char], codeSample); // todo: prevent infinity traversing when entire file commented
        } else {
          char++;
        }
      } else {
        if (isLineBoundaryRight(char, currentLineLen)) {
          line++;
          char = 0;
        } else {
          char++;
        }
      }
      nextSkipMask = skipMask2dArray[line][char];
    }
    nextCursor = [line, char];
  }
  return nextCursor;
}

function getPrevCursor(prevCursorIndex, codeSample) {
  const {skipMask2dArray} = codeSample;
  const [line, char] = prevCursorIndex;

  // Start boundary
  if (isContentBoundaryLeft(line, char)) {
    return [0, 0];
  }

  let nextCursor = isLineBoundaryLeft(char) ? [line - 1, codeSample.contentAs2dArray[line - 1].length - 1] : [line, char - 1];

  // Skip comments
  let nextSkipMask = skipMask2dArray[nextCursor[0]][nextCursor[1]];
  if (nextSkipMask > 0) {
    let [line, char] = nextCursor;
    while (nextSkipMask !== 0) {
      if (line < 1) {
        if (char - 1 < 0) {
          return getNextCursor([line, char], codeSample); // todo: prevent infinity traversing when entire file commented
        } else {
          char--;
        }
      } else {
        if (isLineBoundaryLeft(char)) {
          line--;
          char = codeSample.contentAs2dArray[line].length - 1;
        } else {
          char--;
        }
      }

      nextSkipMask = skipMask2dArray[line][char];
    }
    nextCursor = [line, char];
  }

  return nextCursor;
}

export function insertElementIntoArray2dCopy(array, position, element) {
  return [
    ...array.slice(0, position),
    element,
    ...array.slice(position + 1),
  ];
}
