import {splitTextLines, spacesIntoTabs} from "../utils/text";
import {initEmptyContent2dArray} from "./redux/correctness";
import {getTokens} from "token-resolver";

export default async function CreateCodeSample({fileName, content, html_url}) {
  let text = decodeURIComponent(escape(window.atob(content)));
  if (text.length > 10000) text = text.slice(0, 10000);

  let contentAsLines = splitTextLines(text);
  contentAsLines = spacesIntoTabs(contentAsLines);

  const contentAs2dArray = contentAsLines.map(line => line.split(''));

  const tokensAs2dArray = await getTokens(contentAsLines, fileName);

  // Prepare skipping mask
  const skipMask2dArray = parseSkipMask(contentAs2dArray, tokensAs2dArray);

  // Gather final amount of successful letters
  let totalChars = 0;
  for (let i = 0; i < skipMask2dArray.length; i++) {
    for (let j = 0; j < skipMask2dArray[i].length; j++) {
      if (skipMask2dArray[i][j] === 0) totalChars++
    }
  }

  return {
    id: Math.random().toString(36).slice(2),
    title: fileName,
    contentAsLines,
    contentAs2dArray,
    skipMask2dArray,
    tokensAs2dArray,
    totalChars,
    contentLinesLen: contentAs2dArray.length,
    createdAt: new Date().getTime(),
    html_url
  };
}

export function parseSkipMask(contentAs2dArray, tokensAs2dArray) {
  let skipMask2dArr = initEmptyContent2dArray(contentAs2dArray);

  for (let ln = 0; ln < tokensAs2dArray.length; ln++) {
    // Parse skipable tokens
    for (let tn = 0; tn < tokensAs2dArray[ln].length; tn++) {
      const t = tokensAs2dArray[ln][tn];
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

    // Special cases:
    // Remove tabs completely
    let c = 0;
    let skipMask = 0;
    while (c < skipMask2dArr[ln].length) {
      if (contentAs2dArray[ln][c] === '\t') {
        skipMask2dArr[ln][c] = ++skipMask;
        c++;
      } else {
        break;
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
