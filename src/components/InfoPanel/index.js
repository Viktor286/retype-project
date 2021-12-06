// import { millisecondsToTime } from "../../utils/misc";
import "./index.css";

function markBodyAsComplete() {
  window.document.body.classList.add('completed');
}

function unmarkBodyAsComplete() {
  window.document.body.classList.remove('completed');
}

const InfoPanel = ({correctness}) => {

  const {
    correctAmount,
    keysLeft,
    keysCompletedPercent,
    isComplete,
    mistakes,
    corrections,
  } = correctness

  isComplete ? markBodyAsComplete() : unmarkBodyAsComplete();

  const progress = keysCompletedPercent + "%";

  return (
    <section className={"infoPanel" + (isComplete ? " complete" : "")}>
      <div className="progressbar">
        <div className="bar" style={{width: progress}}>
          &nbsp;
        </div>
      </div>
      <div className="currentStats">
        {/*{millisecondsToTime(timeCounted)}, CPM {cpm}*/}
      </div>
      <div className="currentStatus">
        <span className={"text"}>
          <span className={isComplete ? "complete" : "progress"}>
            {isComplete ? "Complete!" : "In progress:"}
          </span>
        </span>
        correct: {correctAmount} /&nbsp;
        <span className="keysLeft">left: {keysLeft} / mistakes: {mistakes} / corrections: {corrections}</span>
      </div>
      <div className="todayStats">
        {/*{millisecondsToTime(timeCountedSum)}, CPM {cpmAverage}, {keysSuccessSum}*/}
      </div>
    </section>
  );
};

export default InfoPanel;
