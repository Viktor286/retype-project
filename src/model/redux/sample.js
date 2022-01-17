const initialState = {
  contentAs2dArray: [[]],
  contentAsLines: [],
  contentLinesLen: 0,
  createdAt: 0,
  html_url: "",
  id: "",
  skipMask2dArray: [],
  title: "",
  subDivisions: [[]],
  totalChars: 0,
};

// Actions
export const SM_SET_SAMPLE = "SM_SET_SAMPLE";

export const setCodeSample = codeSample => ({
  type: SM_SET_SAMPLE,
  codeSample
});

// Reducer
export const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SM_SET_SAMPLE:
      const {codeSample} = action;
      return {
        ...codeSample,
      };
    default:
      return state;
  }
};
