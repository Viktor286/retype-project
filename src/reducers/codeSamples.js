const codeSampleDefault = [];

const codeSamples = (state = codeSampleDefault, action) => {
  switch (action.type) {
    case "INIT_COLLECTION":
      return action.collection;
    default:
      return state;
  }
};

export default codeSamples;
