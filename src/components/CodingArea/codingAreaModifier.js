const CHAR_STATE = {
  NO_CHANGE: null,
  RESET: 0,
  SUCCESS: 1,
  MISTAKE: 2,
};

const codingAreaModifier = (prevState, { cursor, type: actionType }) => {
  const codeSampleLen = prevState.currentCodeSample.contentLen;
  let currentCharStateCode = 0;
  let nextCursorIndex = 0; // default
  let mistakes = prevState.characterCorrectness.mistakes;
  let corrections = prevState.characterCorrectness.corrections;

  if (actionType === "delete") {
    nextCursorIndex = getNextCursor(
      prevState.codeArea.cursorIndex,
      codeSampleLen
    );
    currentCharStateCode = CHAR_STATE.RESET;
    ++corrections;
  }

  if (actionType === "backspace") {
    nextCursorIndex = getPrevCursor(prevState.codeArea.cursorIndex);
    currentCharStateCode = CHAR_STATE.RESET;
    ++corrections;
  }

  if (actionType === "match") {
    nextCursorIndex = getNextCursor(
      prevState.codeArea.cursorIndex,
      codeSampleLen
    );
    currentCharStateCode = CHAR_STATE.SUCCESS;
  }

  if (actionType === "mistake") {
    nextCursorIndex = getNextCursor(
      prevState.codeArea.cursorIndex,
      codeSampleLen
    );
    currentCharStateCode = CHAR_STATE.MISTAKE;
    ++mistakes;
  }

  if (actionType === "one-forward") {
    nextCursorIndex = getNextCursor(
      prevState.codeArea.cursorIndex,
      codeSampleLen
    );
    currentCharStateCode = CHAR_STATE.NO_CHANGE;
  }

  if (actionType === "one-backward") {
    nextCursorIndex = getPrevCursor(prevState.codeArea.cursorIndex);
    currentCharStateCode = CHAR_STATE.NO_CHANGE;
  }

  // update updateStateObj
  let updateStateObj = {};

  if (currentCharStateCode !== CHAR_STATE.NO_CHANGE) {
    const newStat = prevState.characterCorrectness.map.slice(0);

    if (actionType === "backspace") {
      newStat[cursor - 1] = currentCharStateCode;
    }

    if (actionType !== "backspace") {
      newStat[cursor] = currentCharStateCode;
    }

    const keysSuccess = newStat.filter(x => x === 1).length;
    const keysLeft = prevState.currentCodeSample.contentLen - keysSuccess;
    const keysLeftPercent = parseInt(
      keysSuccess / (prevState.currentCodeSample.contentLen / 100),
      10
    );

    updateStateObj.characterCorrectness = {
      ...prevState.characterCorrectness,
      map: newStat,
      keysLeft,
      keysSuccess,
      keysLeftPercent,
      isComplete: keysLeft <= 0,
      corrections, // char overwrite doesnt count yet
      mistakes
    };

    const { cpm, timeCounted } = updateStateObj.characterCorrectness;
    updateStateObj.userStat = {
      ...updateStateObj.userStat,
      lastCompletion: {
        cpm,
        timeCounted,
        corrections,
        mistakes,
        timestamp: new Date().getTime()
      }
    };
  } else {
    updateStateObj.characterCorrectness = {
      ...prevState.characterCorrectness
    };
  }

  updateStateObj.codeArea = {
    ...prevState.codeArea,
    cursorIndex: nextCursorIndex,
    timeCountingDelay: 5000
  };

  return updateStateObj;
};

const getNextCursor = (prevCursorIndex, contentLen) => {
  return prevCursorIndex < contentLen - 1
    ? prevCursorIndex + 1
    : prevCursorIndex;
};

const getPrevCursor = prevCursorIndex => {
  return prevCursorIndex > 0 ? prevCursorIndex - 1 : prevCursorIndex;
};

export { codingAreaModifier };
