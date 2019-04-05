import React from "react";
import "../css/CodingArea.css";

const CodingArea = ({
  cursorIndex,
  characterCorrectnessMap,
  currentCodeSample: {
    contentAsArray: currentCodeSampleAsArr,
    title: codeSampleTitle,
    mainCategory
  }
}) => (
  <section className="codingArea">
    <h2>
      {codeSampleTitle}
      <div className="mainCategory">({mainCategory})</div>
    </h2>
    {currentCodeSampleAsArr.map((char, idx) => {
      let displayChar = char;

      // Markup
      let cssClasses = ["char"];

      if (cursorIndex === idx) {
        cssClasses[cssClasses.length] = "cursor";
      }

      if (characterCorrectnessMap[idx] === 0) {
        cssClasses[cssClasses.length] = "await";
      }

      if (characterCorrectnessMap[idx] === 1) {
        cssClasses[cssClasses.length] = "ok";
      }

      if (characterCorrectnessMap[idx] === 2) {
        cssClasses[cssClasses.length] = "mistake";
      }

      // 'enter' character output case
      if (char.charCodeAt(0) === 10) {
        cssClasses[cssClasses.length] = "lineBreak";
        displayChar = "↵";
      }

      // tab character output case
      if (char.charCodeAt(0) === 9) {
        cssClasses[cssClasses.length] = "tab";
        displayChar = "⇥";
      }

      return (
        <span key={idx} className={cssClasses.join(" ")}>
          {displayChar}
        </span>
      );
    })}
  </section>
);

export default CodingArea;
