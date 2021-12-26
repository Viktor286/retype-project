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
  corrections: 0,
};

// Actions
export const INIT = "INIT";
export const DELETE = "DELETE";
export const BACKSPACE = "BACKSPACE";
export const MATCH = "MATCH";
export const MISTAKE = "MISTAKE";
export const ONE_FORWARD = "ONE_FORWARD";
export const ONE_BACKWARD = "ONE_BACKWARD";
// export const JUMP_TO = "JUMP_TO";

export const initCorrectness = () => ({
  type: INIT,
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
  let {correctAmount, mistakes, corrections } = state;

  switch (command) {
    case DELETE:
      if (prevCharState === CHAR_STATE.MISTAKE) {
        corrections += 1;
      }

      if (prevCharState === CHAR_STATE.SUCCESS) {
        correctAmount -= 1;
        corrections += 1;
      }
      break;
    case BACKSPACE:
      if (prevCharState === CHAR_STATE.MISTAKE) {
        corrections += 1;
      }

      if (prevCharState === CHAR_STATE.SUCCESS) {
        correctAmount -= 1;
        corrections += 1;
      }
      break;
    case MATCH:
      if (prevCharState !== CHAR_STATE.SUCCESS) {
        correctAmount += 1;
      }

      if (prevCharState === CHAR_STATE.MISTAKE) {
        corrections += 1;
      }
      break;
    case MISTAKE:
      mistakes += 1;

      if (prevCharState === CHAR_STATE.SUCCESS) {
        correctAmount -= 1;
      }
      break;

    default:
    // pass
  }

  return {
    keysLeft: totalChars - correctAmount,
    keysCompletedPercent: parseInt(correctAmount / (totalChars / 100), 10),
    correctAmount,
    mistakes,
    corrections,
    isComplete: correctAmount === totalChars,
  }
}

// Reducer
const correctnessReducer = (state = initialState, action) => {
  let stats = {};
  const codeSample = window.codeTrainerApp?.codeSample || {};
  const {cursorIndex: cursor} = state;

  switch (action.type) {
    case INIT: {
      return {
        ...state,
        correctAs2dArray: initEmptyContent2dArray(codeSample.contentAs2dArray),
        cursorIndex: codeSample.skipMask2dArray[0][0] > 0 ? getNextCursor(cursor, codeSample) : cursor,
      };
    }
    case DELETE: {
      const [line, char] = cursor;
      const lineAsArr = state.correctAs2dArray[line].slice(0);

      const prevCharState = lineAsArr[char];
      lineAsArr[char] = CHAR_STATE.RESET;

      stats = resolveStats(DELETE, state, prevCharState, codeSample.totalChars);

      return {
        ...state,
        ...stats,
        prevCharState,
        cursorIndex: getNextCursor(cursor, codeSample),
        correctAs2dArray: insertElementIntoArray2dCopy(state.correctAs2dArray, line, lineAsArr),
      };
    }

    case BACKSPACE: {
      const [line, char] = cursor;
      const lineAsArr = state.correctAs2dArray[line].slice(0);

      const prevCharState = lineAsArr[char];
      lineAsArr[char] = CHAR_STATE.RESET;

      stats = resolveStats(BACKSPACE, state, prevCharState, codeSample.totalChars);

      return {
        ...state,
        ...stats,
        prevCharState,
        cursorIndex: getPrevCursor(cursor, codeSample),
        correctAs2dArray: insertElementIntoArray2dCopy(state.correctAs2dArray, line, lineAsArr),
      };
    }
    case MATCH: {
      const [line, char] = cursor;
      const lineAsArr = state.correctAs2dArray[line].slice(0);

      const prevCharState = lineAsArr[char];
      lineAsArr[char] = CHAR_STATE.SUCCESS;

      stats = resolveStats(MATCH, state, prevCharState, codeSample.totalChars);

      return {
        ...state,
        ...stats,
        prevCharState,
        cursorIndex: getNextCursor(cursor, codeSample),
        correctAs2dArray: insertElementIntoArray2dCopy(state.correctAs2dArray, line, lineAsArr),
      };
    }
    case MISTAKE: {
      const [line, char] = cursor;
      const lineAsArr = state.correctAs2dArray[line].slice(0);

      const prevCharState = lineAsArr[char];
      lineAsArr[char] = CHAR_STATE.MISTAKE;

      stats = resolveStats(MISTAKE, state, prevCharState, codeSample.totalChars);

      return {
        ...state,
        ...stats,
        prevCharState,
        cursorIndex: getNextCursor(cursor, codeSample),
        correctAs2dArray: insertElementIntoArray2dCopy(state.correctAs2dArray, line, lineAsArr),
      };
    }
    case ONE_FORWARD:
      return {
        ...state,
        cursorIndex: getNextCursor(cursor, codeSample),
      };
    case ONE_BACKWARD:
      return {
        ...state,
        cursorIndex: getPrevCursor(cursor, codeSample),
      };
    // case JUMP_TO:
    //   return {
    //     ...state,
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

export const correctness = (state = initialState, action) => {
  const newState = correctnessReducer(state, action);
  if (window.codeTrainerApp) window.codeTrainerApp.correctness = newState;
  return newState;
};
