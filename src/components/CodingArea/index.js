import "./index.css";

const CodingArea = ({
                      cursorIndex,
                      characterCorrectness,
                      currentCodeSample: {contentAs2dArray, skipMask2dArray, colorMask2dArray, tokensAs2dArray}
                    }) => {
  return <section className="codingArea">
    {contentAs2dArray.map((linesArr, lineNumber) => {

      const linePayload = {
        linesArr,
        lineNumber,
        lineSkipMask: skipMask2dArray[lineNumber],
        correctnessLine: characterCorrectness[lineNumber],
        colorMask2dArray,
        tokensAs2dArray,
        key: `l${lineNumber}`,
      };

      return lineNumber === cursorIndex[0] ?
        <ActiveCodingLine {...{cursorInLine: cursorIndex[1], ...linePayload}} /> :
        <CodingLine {...linePayload} />
    })}
  </section>
};

// function ActiveCodingLine({linesArr, lineNumber, correctnessLine, cursorInLine, lineSkipMask}) {
//   return <div className={`line ${lineNumber} active`}>
//     <div className='char lineNum'>&nbsp;{lineNumber}</div>
//     <div className='code'>
//       {linesArr.map((char, charNumInLine) => <CodingChar {...{
//         charCorrectness: correctnessLine[charNumInLine],
//         charNumInLine,
//         char,
//         isActive: cursorInLine === charNumInLine,
//         key: `l${lineNumber}c${charNumInLine}`,
//         lineSkipMask,
//       }} />)}
//     </div>
//   </div>
// }

function ActiveCodingLine({linesArr, lineNumber, correctnessLine, cursorInLine, lineSkipMask, tokensAs2dArray}) {
  let lineTokens = tokensAs2dArray[lineNumber];

  return <div className={`line ${lineNumber} active`}>
    <div className='char lineNum'>&nbsp;{lineNumber}</div>
    <div className='code'>
      {lineTokens.map((token, id) => {
        const [start, end] = token.ltRange;
        return <span key={id} style={{color: token.foregroundColor}}>{linesArr.slice(start, end + 1).map((char, charNumInLine) => {
          charNumInLine += start;
          return <CodingChar {...{
            charCorrectness: correctnessLine[charNumInLine],
            charNumInLine,
            char,
            isActive: cursorInLine === charNumInLine,
            key: `l${lineNumber}c${charNumInLine}`,
            lineSkipMask,
          }} />
        })}</span>
      })}
    </div>
  </div>
}


function CodingLine({linesArr, lineNumber, correctnessLine, lineSkipMask, tokensAs2dArray}) {
  let lineTokens = tokensAs2dArray[lineNumber];

  return <div className={`line ${lineNumber}`}>
    <div className='char lineNum'>&nbsp;{lineNumber}</div>
    <div className='code'>
      {lineTokens.map((token, id) => {
        const [start, end] = token.ltRange;
        return <span key={id} style={{color: token.foregroundColor}}>{linesArr.slice(start, end + 1).map((char, charNumInLine) => {
          charNumInLine += start;
          return <CodingChar {...{
            charCorrectness: correctnessLine[charNumInLine],
            charNumInLine,
            char,
            key: `l${lineNumber}c${charNumInLine}`,
            lineSkipMask,
          }} />
        })}</span>
      })}
    </div>
  </div>
}

function CodingChar({char, charNumInLine, charCorrectness, lineSkipMask, isActive = false}) {
  let displayChar = char;

  // Markup
  let cssClasses = ["char"];

  // Return early if skip
  if (lineSkipMask[charNumInLine] > 0) {
    cssClasses.push("skip");
    return <span key={`c${charNumInLine}`} className={cssClasses.join(" ")}>{displayChar}</span>;
  }

  // 'enter' character output case
  if (char.charCodeAt(0) === 10) {
    cssClasses.push("lineBreak");
    displayChar = "↵";
  }

  // tab character output case
  if (char.charCodeAt(0) === 9) {
    cssClasses.push("tab");
    displayChar = "⇥";
  }

  if (isActive) {
    cssClasses.push("cursor");
  }

  if (charCorrectness === 0) {
    cssClasses.push("await");
  }

  if (charCorrectness === 1) {
    cssClasses.push("ok");
  }

  if (charCorrectness === 2) {
    cssClasses.push("mistake");
  }

  return <span key={`c${charNumInLine}`} className={cssClasses.join(" ")}>{displayChar}</span>;
}


export default CodingArea;
