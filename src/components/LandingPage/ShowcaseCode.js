import React, { useEffect, useState } from 'react';
import CreateCodeSample from '../../model/CodeSample';
import { fontSizes } from '../../model/redux/userSettings';
import { CodingLine } from '../CodingArea';

export const ShowcaseCode = ({ codeContent }) => {
  const [codeSample, setCodeSample] = useState({});

  useEffect(() => {
    if (!codeContent) return () => {};
    const { content, name, html_url, url } = codeContent;

    CreateCodeSample({
      fileName: decodeURI(name),
      content,
      html_url: decodeURI(html_url),
    }).then((resCodeSample) => {
      setCodeSample(resCodeSample);
    });
  }, [codeContent]);

  if (!codeContent) return null;
  const { contentAs2dArray, skipMask2dArray, colorMask2dArray, subDivisions, totalChars, title, html_url } =
    codeSample;

  if (!html_url) return null;

  const url = new URL(html_url);
  const { pathname } = url;
  return (
    <>
      <a className="code-link" href={pathname}>
        <h2 className="codePreview">
          {title} <span>({totalChars})</span>
        </h2>
        <div className="code-zone-box">
          <section className={`codeZone ${fontSizes[1]} fade-out-typing-mode`}>
            {contentAs2dArray &&
              contentAs2dArray.map((linesArr, lineNumber) => {
                const linePayload = {
                  linesArr,
                  lineNumber,
                  lineSkipMask: skipMask2dArray[lineNumber],
                  colorMask2dArray,
                  subDivisions,
                  key: `l${lineNumber}`,
                };
                return <CodingLine {...linePayload} />;
              })}
          </section>
          <div className="code-zone-border"></div>
        </div>
      </a>
    </>
  );
};
