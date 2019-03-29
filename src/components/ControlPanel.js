import React from "react";
import { millisecondsToTime } from "../functions/misc";

const ControlPanel = ({
  keysSuccess,
  keysLeft,
  keysLeftPercent,
  isComplete,
  timeCounted
}) => (
  <section id="bottomPanel" className={isComplete ? "complete" : null}>
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
    <div className={"timerStats"}>{millisecondsToTime(timeCounted)}</div>
    <div className="statPanelNumbers">
      <span className={"statusText"}>
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
