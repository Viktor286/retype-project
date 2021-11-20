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

    case "UPDATE_CS_ELEMENT":
      return [
        ...state.slice(0, action.targetIndex),
        {
          ...state[action.targetIndex],
          activeState: action.activeState
        },
        ...state.slice(action.targetIndex + 1)
      ];

    default:
      return state;
  }
};
