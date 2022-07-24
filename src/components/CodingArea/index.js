import './index.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTypingMode } from '../../model/redux/stats';

const CodingArea = ({
  codeSample: { contentAs2dArray, skipMask2dArray, colorMask2dArray, subDivisions },
}) => {
  const dispatch = useDispatch();
  const correctness = useSelector((state) => state.correctness);
  const { correctAs2dArray, cursorIndex } = correctness;
  const stats = useSelector((state) => state.stats);
  const { typingMode } = stats;

  const [font, setFont] = useState(4);
  const fontSizes = [
    'fs-xxxs',
    'fs-xxs',
    'fs-xs',
    'fs-s',
    'fs-m',
    'fs-l',
    'fs-xl',
    'fs-xxl',
    'fs-xxxl',
    'fs-4xl',
  ];
  const onFontDecrease = () => {
    setFont(font + -1 < 0 ? font : font - 1);
  };
  const onFontIncrease = () => {
    setFont(font + 1 > fontSizes.length - 1 ? font : font + 1);
  };

  return (
    <>
      <section
        className={`codingArea ${fontSizes[font]} ${
          typingMode === 0 ? 'fade-out-typing-mode' : 'fade-in-typing-mode'
        }`}
      >
        <div className="top-bar">
          {/* temporary make as a button to keep away from keyboard enter functionality */}
          <div
            className="toggle-typing-mode"
            onClick={(e) => {
              dispatch(toggleTypingMode(typingMode));
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 64V448C362 448 448 362 448 256C448 149.1 362 64 256 64z" />
            </svg>
          </div>
          {/* temporary quick-make font-controls here as experimental feature */}
          <div className="font-controls">
            <button className="font-decrease" onClick={onFontDecrease}>
              A-
            </button>
            <button className="font-increase" onClick={onFontIncrease}>
              A+
            </button>
          </div>
        </div>
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
