import { millisecondsToTime } from "../../utils/misc";
import "./index.css";

function markBodyAsComplete() {
  window.document.body.classList.add('completed');
}

const Index = ({
  characterCorrectness: {
    keysSuccess,
    keysLeft,
    keysLeftPercent,
    isComplete,
    timeCounted,
    cpm
  },
  // userStat: {
    // todayCompleted: { timeCountedSum, cpmAverage, keysSuccessSum }
  // }
}) => {
  if (isComplete) {
    markBodyAsComplete();
  }

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
        {/*{millisecondsToTime(timeCountedSum)}, CPM {cpmAverage}, {keysSuccessSum}*/}
      </div>
    </section>
  );
};

export default Index;
