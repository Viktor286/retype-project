import codeSamplesDataBase from "../testData/MockDB";

const codeSampleDefault = [];

const codeSamples = (state = codeSampleDefault, action) => {
  switch (action.type) {
    case "INIT_COLLECTION":
      return codeSamplesDataBase;
    default:
      return state;
  }
};

export default codeSamples;
