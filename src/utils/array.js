export function initEmptyContent2dArray(contentAs2dArray) {
  const emptyContentAs2dArray = new Array(contentAs2dArray.length);
  for (let i = 0; i < contentAs2dArray.length; i++) {
    emptyContentAs2dArray[i] = new Array(contentAs2dArray[i].length).fill(0);
  }
  return emptyContentAs2dArray;
}
