import React from "react";
import { millisecondsToTime } from "../functions/misc";

const ControlPanel = ({
  characterCorrectness: {
    keysSuccess,
    keysLeft,
    keysLeftPercent,
    isComplete,
    timeCounted,
    cpm
  },
  userStat: {
    todayCompleted: { timeCountedSum, cpmAverage, keysSuccessSum }
  }
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
    <div className="timerStats">
      {millisecondsToTime(timeCounted)}, CPM {cpm}
    </div>
    <div className="todayStats">
      {millisecondsToTime(timeCountedSum)}, CPM {cpmAverage}, {keysSuccessSum}
    </div>
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
