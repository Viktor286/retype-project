const codeSampleDefault = [];

export const codeSamplesIndex = (state = codeSampleDefault, action) => {
  switch (action.type) {
    case "INIT_COLLECTION":
      return action.collection.map(elm => elm.activeState.currentCodeSample.id);
    default:
      return state;
  }
};

export const codeSamples = (state = codeSampleDefault, action) => {
  switch (action.type) {
    case "INIT_COLLECTION":
      return action.collection;

    case "MARK_CS_COMPLETE":
      let currentCodeSampleIndex = 0;

      const currCSObj = state.filter((cs, idx) => {
        if (cs.activeState.currentCodeSample.id === action.id) {
          currentCodeSampleIndex = idx;
          return true;
        }
        return false;
      })[0];

      const updatedCodeSampleObject = {
        ...currCSObj,
        activeState: {
          ...currCSObj.activeState,
          characterCorrectness: {
            ...currCSObj.activeState.characterCorrectness,
            isComplete: true
          }
        }
      };

      return [
        ...state.slice(0, currentCodeSampleIndex),
        updatedCodeSampleObject,
        ...state.slice(currentCodeSampleIndex + 1)
      ];

    default:
      return state;
  }
};
