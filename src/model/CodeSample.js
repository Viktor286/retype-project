import { spacesIntoTabs, splitTextLines } from '../utils/text';
import resolver from '../modules/resolver';
import { parseSkipMask } from './parseSkipMask';
import convertMarkdownFile from './convertMarkdownFile';

const textCharsLimit = 20000;

export default async function CreateCodeSample({ fileName, content, html_url, credentials }) {
  let text = decodeURIComponent(escape(window.atob(content)));
  text = text.replaceAll('\ufeff', '');
  if (text.length > textCharsLimit) text = text.slice(0, textCharsLimit);

  let contentAsLines = splitTextLines(text);
  contentAsLines = spacesIntoTabs(contentAsLines);
  contentAsLines = convertMarkdownFile(contentAsLines, fileName);
  const contentAs2dArray = contentAsLines.map((line) => line.split(''));
  const subDivisions = await resolver(contentAsLines, fileName);
  const skipMask2dArray = parseSkipMask(contentAs2dArray, subDivisions);
  // Gather final amount of successful letters
  let totalChars = 0;
  for (let i = 0; i < skipMask2dArray.length; i++) {
    for (let j = 0; j < skipMask2dArray[i].length; j++) {
      if (skipMask2dArray[i][j] === 0) totalChars++;
    }
  }

  return {
    id: Math.random().toString(36).slice(2),
    title: fileName,
    contentAsLines,
    contentAs2dArray,
    skipMask2dArray,
    subDivisions,
    totalChars,
    contentLinesLen: contentAs2dArray.length,
    createdAt: new Date().getTime(),
    html_url,
    credentials,
  };
}
