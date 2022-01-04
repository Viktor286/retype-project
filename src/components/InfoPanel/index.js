import "./index.css";
import TimelineTimer from "../TimelineTimer";
import {useSelector} from "react-redux";
import Timer from '../../modules/timer';

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
    keysCompletedPercent,
    isComplete,
    mistakes,
    corrections,
  } = correctness;

  const {elapsedSeconds} = useSelector(state => state.stats);

  isComplete ? markBodyAsComplete() : unmarkBodyAsComplete();

  return (
    <section className={"infoPanel" + (isComplete ? " complete" : "")}>
      <TimelineTimer
        totalChars={totalChars}
        isComplete={isComplete}
        keysCompletedPercent={keysCompletedPercent}
      />
      <div className="currentStats">
        {Timer.msToTimeString(elapsedSeconds * 1000)}, CPM {correctAmount > 0 && elapsedSeconds > 0 ? Number(60 / (elapsedSeconds / correctAmount)).toFixed(2) : 0}
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
        {/*CPM */}
      </div>
    </section>
  );
};

export default InfoPanel;
