import './index.css';
import React from 'react';
import { useSelector } from 'react-redux';
import CodeAreaControls from '../CodeAreaControls';
import { fontSizes } from '../../model/redux/userSettings';

const CodingArea = ({
  codeSample: { contentAs2dArray, skipMask2dArray, colorMask2dArray, subDivisions },
}) => {
  const correctness = useSelector((state) => state.correctness);
  const { correctAs2dArray, cursorIndex } = correctness;

  const userSettings = useSelector((state) => state.userSettings);
  const { fontSize, typingMode } = userSettings;

  return (
    <>
      <section
        className={`codingArea ${fontSizes[fontSize]} ${
          typingMode ? 'fade-out-typing-mode' : 'fade-in-typing-mode'
        }`}
      >
        <CodeAreaControls />
        {contentAs2dArray.map((linesArr, lineNumber) => {
          const linePayload = {
            linesArr,
            lineNumber,
            lineSkipMask: skipMask2dArray[lineNumber],
            correctnessLine: correctAs2dArray[lineNumber],
            colorMask2dArray,
            subDivisions,
            key: `l${lineNumber}`,
          };

          return lineNumber === cursorIndex[0] ? (
            <ActiveCodingLine {...{ cursorInLine: cursorIndex[1], ...linePayload }} />
          ) : (
            <CodingLineMemo {...linePayload} />
          );
        })}
      </section>
    </>
  );
};

function ActiveCodingLine({
  linesArr,
  lineNumber,
  correctnessLine,
  cursorInLine,
  lineSkipMask,
  subDivisions,
}) {
  let lineTokens = subDivisions[lineNumber];

  return (
    <div className={`line ${lineNumber} active`}>
      <div className="char lineNum">&nbsp;{lineNumber}</div>
      <div className="code">
        {lineTokens.map((token, id) => {
          const [start, end] = token.ltRange;
          return (
            <span key={id} style={{ color: token.foregroundColor }}>
              {linesArr.slice(start, end + 1).map((char, charNumInLine) => {
                charNumInLine += start;
                return (
                  <CodingCharMemo
                    {...{
                      charCorrectness: correctnessLine[charNumInLine],
                      charNumInLine,
                      char,
                      isActive: cursorInLine === charNumInLine,
                      key: `l${lineNumber}c${charNumInLine}`,
                      lineSkipMask,
                    }}
                  />
                );
              })}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function CodingLine({ linesArr, lineNumber, correctnessLine, lineSkipMask, subDivisions }) {
  let lineTokens = subDivisions[lineNumber];

  return (
    <div className={`line ${lineNumber}`}>
      <div className="char lineNum">&nbsp;{lineNumber}</div>
      <div className="code">
        {lineTokens.map((token, id) => {
          const [start, end] = token.ltRange;
          const tokenSequence = linesArr.slice(start, end + 1);
          return (
            <span key={id} style={{ color: token.foregroundColor }}>
              {tokenSequence.map((char, charNumInLine) => {
                charNumInLine += start;
                return (
                  <CodingCharMemo
                    {...{
                      charCorrectness: correctnessLine[charNumInLine],
                      charNumInLine,
                      char,
                      key: `l${lineNumber}c${charNumInLine}`,
                      lineSkipMask,
                    }}
                  />
                );
              })}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const CodingLineMemo = React.memo(CodingLine);

function CodingChar({ char, charNumInLine, charCorrectness, lineSkipMask, isActive = false }) {
  let displayChar = char;

  // Markup
  let cssClasses = ['char'];

  // tab character output case
  if (char.charCodeAt(0) === 9) {
    cssClasses.push('tab');
    displayChar = '⇥';
  }

  // Return early if skip
  if (lineSkipMask[charNumInLine] > 0) {
    cssClasses.push('skip');
    return (
      <span key={`c${charNumInLine}`} className={cssClasses.join(' ')}>
        {displayChar}
      </span>
    );
  }

  // 'enter' character output case
  if (char.charCodeAt(0) === 10) {
    cssClasses.push('lineBreak');
    displayChar = '↵';
  }

  if (isActive) {
    cssClasses.push('cursor');
  }

  if (charCorrectness === 0) {
    cssClasses.push('await');
  }

  if (charCorrectness === 1) {
    cssClasses.push('ok');
  }

  if (charCorrectness === 2) {
    cssClasses.push('mistake');
  }

  return (
    <span key={`c${charNumInLine}`} className={cssClasses.join(' ')}>
      {displayChar}
    </span>
  );
}

const CodingCharMemo = React.memo(CodingChar);

export default CodingArea;
