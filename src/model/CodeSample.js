import { spacesIntoTabs, splitTextLines } from '../utils/text';
import resolver from '../modules/resolver';
import { parseSkipMask } from './parseSkipMask';
import convertMarkdownFile from './convertMarkdownFile';

const textCharsLimit = 20000;

// TODO: for the CodeSample model we will have to set the limit of content length as a rule for database
//  there is no reason to parse the endpoint if it's too long

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

  const mainCodeSampleModel = {
    id: Math.random().toString(36).slice(2),
    title: fileName,
    totalChars,
    contentAsText: text,
    contentLinesLen: contentAs2dArray.length,
    createdAt: new Date().getTime(),
    html_url,
    credentialRefs: {
      // todo: extract into converter
      license: {
        key: credentials?.license?.key,
        name: credentials?.license?.name,
        spdx_id: credentials?.license?.spdx_id,
      },
      licenseOriginUrl: credentials?.licenseOriginUrl,
      owner: credentials?.owner,
      repo: credentials?.repo,
    },
  };

  // language: programming language of code (JavaScript, TypeScript),
  //   difficulty: skill level required (beginner, intermediate, advanced),
  //   tags: related topics, concepts or technologies (networking, sockets, server).
  // rating: user-based score (1-5, 1-lowest, 5-highest).

  // console.log('@@ mainCodeSampleModel', JSON.stringify(mainCodeSampleModel));

  const viewCodeSampleModel = {
    contentAsLines,
    contentAs2dArray,
    skipMask2dArray,
    subDivisions,
    credentials,
  };
  // console.log('@@ viewCodeSampleModel', viewCodeSampleModel);

  return {
    ...mainCodeSampleModel,
    ...viewCodeSampleModel,
  };
}
