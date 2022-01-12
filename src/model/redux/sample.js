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
export const SET_SAMPLE = "SET_SAMPLE";

export const setCodeSample = codeSample => ({
  type: SET_SAMPLE,
  codeSample
});

// Reducer
export const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SAMPLE:
      const {codeSample} = action;
      return {
        ...codeSample,
      };
    default:
      return state;
  }
};
