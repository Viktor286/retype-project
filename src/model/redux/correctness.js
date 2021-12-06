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

export const initCorrectness = contentLen => ({
  type: INIT,
  contentLen
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
function resolveStats(command, prevCharState, newCharState, state, contentLen) {
  let {correctAmount, mistakes, corrections} = state;

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
  const {contentLen} = window.codeTrainerApp?.codeSample || {contentLen: 0};
  const {cursor} = action;

  switch (action.type) {
    case INIT:
      return {
        ...state,
        map: new Array(action.contentLen).fill(0),
      };
    case DELETE:
      newMap = state.map.slice(0);
      newMap[cursor] = CHAR_STATE.RESET;

      stats = resolveStats(DELETE, state.map[cursor], newMap[cursor], state, contentLen);

      return {
        ...state,
        ...stats,
        cursorIndex: getNextCursor(cursor, contentLen),
        map: newMap,
      };
    case BACKSPACE:
      newMap = state.map.slice(0);
      newMap[cursor] = CHAR_STATE.RESET;

      stats = resolveStats(BACKSPACE, state.map[cursor], newMap[cursor], state, contentLen);

      return {
        ...state,
        ...stats,
        cursorIndex: getPrevCursor(cursor),
        map: newMap,
      };
    case MATCH:
      newMap = state.map.slice(0);
      newMap[cursor] = CHAR_STATE.SUCCESS;

      stats = resolveStats(MATCH, state.map[cursor], newMap[cursor], state, contentLen);

      return {
        ...state,
        ...stats,
        cursorIndex: getNextCursor(cursor, contentLen),
        map: newMap,
      };
    case MISTAKE:
      newMap = state.map.slice(0);
      newMap[cursor] = CHAR_STATE.MISTAKE;

      stats = resolveStats(MISTAKE, state.map[cursor], newMap[cursor], state, contentLen);

      return {
        ...state,
        ...stats,
        cursorIndex: getNextCursor(cursor, contentLen),
        map: newMap,
      };
    case ONE_FORWARD:
      return {
        ...state,
        cursorIndex: getNextCursor(cursor, contentLen),
      };
    case ONE_BACKWARD:
      return {
        ...state,
        cursorIndex: getPrevCursor(cursor),
      };
    default:
      return state;
  }
};

export const correctness = (state = initialState, action) => {
  const newState = correctnessReducer(state, action);
  if (window.codeTrainerApp) window.codeTrainerApp.correctness = newState;
  return newState;
};

function getNextCursor(prevCursorIndex, contentLen) {
  return contentLen > prevCursorIndex + 1 ? prevCursorIndex + 1 : contentLen - 1;
}

function getPrevCursor(prevCursorIndex) {
  return prevCursorIndex > 0 ? prevCursorIndex - 1 : 0;
}
