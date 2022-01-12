import {useEffect} from 'react';
import "./index.css";
import TimelineTimer from "../TimelineTimer";
import {useSelector} from "react-redux";
import Timer from '../../modules/timer';
import {createHistorySessionStat} from '../../model/HistorySession';
import {sendHistoryInfo} from '../../modules/persistance/';

function markBodyAsComplete() {
  window.document.body.classList.add('completed');
}

function unmarkBodyAsComplete() {
  window.document.body.classList.remove('completed');
}

const InfoPanel = ({codeSample, parentCurrent}) => {
  const state = useSelector(state => state);
  const {stats, correctness, auth} = state;

  const {elapsedSeconds, cpm, wpm} = stats;
  const {correctAmount, keysLeft, isComplete, mistakes, corrections} = correctness;
  const {uid} = auth;

  const {totalChars, html_url} = codeSample;
  const codeSamplePath = new URL(html_url).pathname;

  useEffect(() => {
    if (isComplete && uid && codeSamplePath) {
      // Turn off keyboard handler when session completed
      if (correctness.isComplete && parentCurrent.keydownHandler) {
        document.removeEventListener("keydown", parentCurrent.keydownHandler);
      }

      // Save historySessionData
      const historySessionData = createHistorySessionStat(stats, correctness, codeSamplePath);
      sendHistoryInfo(uid, historySessionData).then(response => {
        // console.log('@@@ historySessionData sent', historySessionData, response);
      });
    }
    // eslint-disable-next-line
  }, [isComplete, uid, codeSamplePath]);

  isComplete ? markBodyAsComplete() : unmarkBodyAsComplete();

  return (
    <section className={"infoPanel" + (isComplete ? " complete" : "")}>
      <TimelineTimer
        totalChars={totalChars}
      />
      <div className="currentStats">
        {Timer.msToTimeString(elapsedSeconds * 1000)}, CPM {cpm}, WPM {wpm}
      </div>
      <div className="currentStatus">
        <span className={"text"}>
          <span className={isComplete ? "complete" : "progress"}>
            {isComplete ? "Completed!" : "In progress:"}
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
