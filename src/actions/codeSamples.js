export const initPlaylistForCodeSampleExplorer = codeSamples => ({
  type: "INIT_COLLECTION",
  collection: codeSamples
});

export const updateCodeSampleAsComplete = codeSampleId => ({
  type: "MARK_CS_COMPLETE",
  id: codeSampleId
});

export const updateCodeSampleElement = activeState => ({
  type: "UPDATE_CS_ELEMENT",
  activeState
});
