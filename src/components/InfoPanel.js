import React from "react";
import { millisecondsToTime } from "../functions/misc";
import "../css/InfoPanel.css";

const InfoPanel = ({
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
}) => {
  const progress = keysLeftPercent + "%";

  return (
    <section className={"infoPanel" + (isComplete ? " complete" : "")}>
      <div className="progressbar">
        <div className="bar" style={{ width: progress }}>
          &nbsp;
        </div>
      </div>
      <div className="currentStats">
        {millisecondsToTime(timeCounted)}, CPM {cpm}
      </div>
      <div className="currentStatus">
        <span className={"text"}>
          <span className={isComplete ? "complete" : "progress"}>
            {isComplete ? "Complete!" : "In progress:"}
          </span>
        </span>
        {keysSuccess}
        <span className="keysLeft"> / {keysLeft}</span>
      </div>
      <div className="todayStats">
        {millisecondsToTime(timeCountedSum)}, CPM {cpmAverage}, {keysSuccessSum}
      </div>
    </section>
  );
};

export default InfoPanel;
