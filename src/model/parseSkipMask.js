import { initEmptyContent2dArray } from '../utils/array';

export function parseSkipMask(contentAs2dArray, subDivisions) {
  let skipMask2dArr = initEmptyContent2dArray(contentAs2dArray);

  // Work with tokens
  for (let ln = 0; ln < subDivisions.length; ln++) {
    for (let tn = 0; tn < subDivisions[ln].length; tn++) {
      const t = subDivisions[ln][tn];
      if (t.tokenType === 1) {
        const [start, end] = t.ltRange;
        //  0 - no skip, 1 - start skip, 2 - inner skip, 3 - end skip
        const commentsArray = new Array(end - start + 1).fill(2);
        commentsArray[0] = 1;
        commentsArray[commentsArray.length - 1] = 3;

        skipMask2dArr[ln] = [
          ...skipMask2dArr[ln].slice(0, start),
          ...commentsArray,
          ...skipMask2dArr[ln].slice(end, skipMask2dArr[ln].length - 1),
        ];
      }
    }

    // Handle special cases:
    for (let c = 0; c < skipMask2dArr[ln].length; c++) {
      // Skip characters
      if (
        contentAs2dArray[ln][c] === '\t' || // tabs
        contentAs2dArray[ln][c].charCodeAt(0) > 126 // non ASCII chars
      ) {
        skipMask2dArr[ln][c] = resolveSkipCode(skipMask2dArr[ln], c);
      }
    }

    // In case the the last char in the line is "\n", replace it like it was the last char in comment
    if (
      skipMask2dArr[ln][skipMask2dArr[ln].length - 2] === 3 &&
      contentAs2dArray[ln][contentAs2dArray[ln].length - 1] === '\n'
    ) {
      skipMask2dArr[ln][skipMask2dArr[ln].length - 2] = 2;
      skipMask2dArr[ln][skipMask2dArr[ln].length - 1] = 3;
    }
  }

  return skipMask2dArr;
}

function resolveSkipCode(skipMaskLine, skipCursor) {
  if (skipCursor === 0 || skipMaskLine[skipCursor - 1] === 0) {
    return 1;
  }

  if (skipMaskLine[skipCursor + 1] === 0 || skipCursor === skipMaskLine.length - 1) {
    // back step adjusting
    if (skipMaskLine[skipCursor - 1] === 3) {
      skipMaskLine[skipCursor - 1] = 2;
    }

    return 3;
  }

  if (skipMaskLine[skipCursor - 1] === 1 || skipMaskLine[skipCursor - 1] === 2) {
    return 2;
  }
}
