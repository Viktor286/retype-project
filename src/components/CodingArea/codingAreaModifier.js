const codingAreaModifier = (prevState, { cursor, type: actionType }) => {
  const codeSampleLen = prevState.currentCodeSample.contentLen;
  let currentCharStateCode = 0;
  let nextCursorIndex = 0; // default
  let mistakes = prevState.characterCorrectness.mistakes;
  let corrections = prevState.characterCorrectness.corrections;

  if (actionType === "delete") {
    nextCursorIndex = getGoNextCursor(
      prevState.codeArea.cursorIndex,
      codeSampleLen
    );
    currentCharStateCode = 0; // reset state
    ++corrections;
  }

  if (actionType === "backspace") {
    nextCursorIndex = getGoPrevCursor(prevState.codeArea.cursorIndex);
    currentCharStateCode = 0; // reset state
    ++corrections;
  }

  if (actionType === "match") {
    nextCursorIndex = getGoNextCursor(
      prevState.codeArea.cursorIndex,
      codeSampleLen
    );
    currentCharStateCode = 1; // ok state
  }

  if (actionType === "mistake") {
    nextCursorIndex = getGoNextCursor(
      prevState.codeArea.cursorIndex,
      codeSampleLen
    );
    currentCharStateCode = 2; // mistake state
    ++mistakes;
  }

  if (actionType === "one-forward") {
    nextCursorIndex = getGoNextCursor(
      prevState.codeArea.cursorIndex,
      codeSampleLen
    );
    currentCharStateCode = null; // no-change state
  }

  if (actionType === "one-backward") {
    nextCursorIndex = getGoPrevCursor(prevState.codeArea.cursorIndex);
    currentCharStateCode = null; // no-change state
  }

  // update updateStateObj
  let updateStateObj = {};

  if (currentCharStateCode !== null) {
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

const getGoNextCursor = (prevCursorIndex, contentLen) => {
  return prevCursorIndex < contentLen - 1
    ? prevCursorIndex + 1
    : prevCursorIndex;
};

const getGoPrevCursor = prevCursorIndex => {
  return prevCursorIndex > 0 ? prevCursorIndex - 1 : prevCursorIndex;
};

export { codingAreaModifier };
