import React from "react";

const CodeSampleControls = props => {
  return (
    <div className="controls">
      <button className="prevCodeSample" onClick={props.controlsPrevHandler}>
        Prev
      </button>
      <button className="resetCodeSample" onClick={props.controlsResetHandler}>
        Reset
      </button>
      <button className="nextCodeSample" onClick={props.controlsNextHandler}>
        Next
      </button>
    </div>
  );
};

export default CodeSampleControls;
