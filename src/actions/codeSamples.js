export const initPlaylistForCodeSampleExplorer = codeSamples => ({
  type: "INIT_COLLECTION",
  collection: codeSamples
});

export const updateCodeSampleElement = (activeState, codeSamplesIndex) => {
  const targetIndex = codeSamplesIndex.findIndex(
    id => activeState.currentCodeSample.id === id
  );

  return {
    type: "UPDATE_CS_ELEMENT",
    activeState,
    targetIndex
  };
};
