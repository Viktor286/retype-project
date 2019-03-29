import React from "react";

const ControlPanel = ({
  keysSuccess,
  keysLeft,
  keysLeftPercent,
  isComplete
}) => (
  <section id="bottomPanel">
    <div id="progressbar">
      <div
        className="bar"
        style={{
          width: keysLeftPercent + "%"
        }}
      >
        &nbsp;
      </div>
    </div>

    <div className="statPanelNumbers">
      <span className="statusText">
        {isComplete ? (
          <span className="complete">Complete!</span>
        ) : (
          <span className="progress">In progress:</span>
        )}
      </span>

      {keysSuccess}
      <span className="keysLeft"> / {keysLeft}</span>
    </div>
  </section>
);

export default ControlPanel;
