// import { millisecondsToTime } from "../../utils/misc";
import "./index.css";
import TimelineTimer from "../TimelineTimer";

function markBodyAsComplete() {
  window.document.body.classList.add('completed');
}

function unmarkBodyAsComplete() {
  window.document.body.classList.remove('completed');
}

const InfoPanel = ({correctness, totalChars}) => {

  const {
    correctAmount,
    keysLeft,
    isComplete,
    mistakes,
    corrections,
  } = correctness

  isComplete ? markBodyAsComplete() : unmarkBodyAsComplete();

  return (
    <section className={"infoPanel" + (isComplete ? " complete" : "")}>
      <TimelineTimer totalChars={totalChars} isComplete={correctness.isComplete} keysCompletedPercent={correctness.keysCompletedPercent} staleTimeout={correctness.staleTimeout}/>
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
        1:10 CPM 20, 313
      </div>
    </section>
  );
};

export default InfoPanel;
