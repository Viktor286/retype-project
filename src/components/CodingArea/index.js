import "./index.css";

const CodingArea = ({
  cursorIndex,
  characterCorrectness,
  currentCodeSample: { contentAsArray: currentCodeSampleAsArr }
}) => {
  const { map: characterCorrectnessMap } = characterCorrectness;
  return <section className="codingArea">
    {currentCodeSampleAsArr.map((char, idx) => {
      let displayChar = char;

      // Markup
      let cssClasses = ["char"];

      if (cursorIndex === idx) {
        cssClasses.push("cursor");
      }

      if (characterCorrectnessMap[idx] === 0) {
        cssClasses.push("await");
      }

      if (characterCorrectnessMap[idx] === 1) {
        cssClasses.push("ok");
      }

      if (characterCorrectnessMap[idx] === 2) {
        cssClasses.push("mistake");
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

      return (
        <span key={idx} className={cssClasses.join(" ")}>
          {displayChar}
        </span>
      );
    })}
  </section>
};

export default CodingArea;
