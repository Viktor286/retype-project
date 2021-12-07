/**
 * Correctness map is basic state of the app.
 * It closely combined with basic stats like correctAmount, keysLeft, mistakes, isComplete for the sake of performance.
 * */

const initialState = {
  correctAmount: 0,
  cursorIndex: 0,
  map: [],
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

export const updateCorrectness = (type, cursor) => ({
  type,
  cursor
});

const CHAR_STATE = {
  NO_CHANGE: null,
  RESET: 0,
  SUCCESS: 1,
  MISTAKE: 2,
};


// prev
function resolveStats(command, prevCharState, newCharState, state, codeSample) {
  let {correctAmount, mistakes, corrections} = state;
  const {contentLen} = codeSample;

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
    keysLeft: contentLen - correctAmount,
    keysCompletedPercent: parseInt(correctAmount / (contentLen / 100), 10),
    correctAmount,
    mistakes,
    corrections,
    isComplete: correctAmount === contentLen,
  }
}

// Reducer
const correctnessReducer = (state = initialState, action) => {
  let newMap;
  let stats = {};
  const codeSample = window.codeTrainerApp?.codeSample || {};
  const {cursor} = action;

  switch (action.type) {
    case INIT:
      return {
        ...state,
        map: new Array(codeSample.contentLen).fill(0),
      };
    case DELETE:
      newMap = state.map.slice(0);
      newMap[cursor] = CHAR_STATE.RESET;

      stats = resolveStats(DELETE, state.map[cursor], newMap[cursor], state, codeSample);

      return {
        ...state,
        ...stats,
        cursorIndex: getNextCursor(cursor, codeSample),
        map: newMap,
      };
    case BACKSPACE:
      newMap = state.map.slice(0);
      newMap[cursor] = CHAR_STATE.RESET;

      stats = resolveStats(BACKSPACE, state.map[cursor], newMap[cursor], state, codeSample);

      return {
        ...state,
        ...stats,
        cursorIndex: getPrevCursor(cursor, codeSample),
        map: newMap,
      };
    case MATCH:
      newMap = state.map.slice(0);
      newMap[cursor] = CHAR_STATE.SUCCESS;

      stats = resolveStats(MATCH, state.map[cursor], newMap[cursor], state, codeSample);

      return {
        ...state,
        ...stats,
        cursorIndex: getNextCursor(cursor, codeSample),
        map: newMap,
      };
    case MISTAKE:
      newMap = state.map.slice(0);
      newMap[cursor] = CHAR_STATE.MISTAKE;

      stats = resolveStats(MISTAKE, state.map[cursor], newMap[cursor], state, codeSample);

      return {
        ...state,
        ...stats,
        cursorIndex: getNextCursor(cursor, codeSample),
        map: newMap,
      };
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

function getNextCursor(prevCursorIndex, codeSample) {
  const {contentLen, skipArray} = codeSample;

  if (prevCursorIndex + 1 >= contentLen) {
    return contentLen - 1;
  }

  let nextCursor = prevCursorIndex + 1;

  if (skipArray[nextCursor]) {
    const len = skipArray.length;
    for (let i=nextCursor; i < len; i++) {
      if (skipArray[i] === 0 || i === len-1) {
        nextCursor = i;
        break;
      }
    }
  }

  return nextCursor;
}

function getPrevCursor(prevCursorIndex, codeSample) {
  const {skipArray} = codeSample;

  if (prevCursorIndex - 1 < 0) {
    return 0;
  }

  let nextCursor = prevCursorIndex - 1;

  if (skipArray[nextCursor]) {
    for (let i=nextCursor; i >= 0; i--) {
      if (skipArray[i] === 0) {
        nextCursor = i;
        break;
      }
    }
  }

  return nextCursor;
}

export const correctness = (state = initialState, action) => {
  const newState = correctnessReducer(state, action);
  if (window.codeTrainerApp) window.codeTrainerApp.correctness = newState;
  return newState;
};
