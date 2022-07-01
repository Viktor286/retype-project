import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { secondsToTime } from '../../../utils/misc';
import { getLocalDailyStats } from '../../../model/DailyStats';
import './CompletionScreen.css';

export default function CompletionScreenModalWindowContent() {
  const goToNextButtonRef = useRef();
  const state = useSelector((state) => state);
  const { stats, sample, correctness } = state;

  const { cpm, wpm, elapsedSeconds } = stats;
  const { title: filename, totalChars } = sample;
  // const origin = html_url.slice(19).split('/')[0]; // destruct 'html_url' from 'sample'

  const { mistakes } = correctness;

  const dailyStats = getLocalDailyStats();
  const { total } = dailyStats;

  useEffect(() => {
    // bugfix: for some reason .focus() causes
    // immediate "click" on the button without setTimeout trick
    // (sending it to the end of exec queue)
    setTimeout(() => goToNextButtonRef?.current?.focus(), 0);
  }, []);

  return (
    <section className="completion-screen">
      <section className="code-sample-details">
        <div className="chars">
          Chars: <span>{totalChars}</span>
        </div>
        <div className="time">
          Time: <span>{secondsToTime(elapsedSeconds)}</span>
        </div>
      </section>

      <div className="success-header">
        <h1>{filename}</h1>
      </div>

      <div className="evaluation-msg">
        {wpm <= 38 ? 'Your result is below average.' : 'Congrats! You did above average.'}
      </div>

      <div className="stats-row">
        <div className="wpm">
          <div className="title">WPM</div>
          <div className="value">{wpm}</div>
        </div>
        <div className="cpm">
          <div className="title">CPM</div>
          <div className="value">{cpm}</div>
        </div>
        <div className="errors">
          <div className="title">Errors %</div>
          <div className="value">{(mistakes / (totalChars / 100)).toFixed(2)}</div>
        </div>
      </div>

      <div className="total-stats-msg">
        Today results: <span className="chars">{total.chars}</span> chars for{' '}
        <span className="time">{secondsToTime(total.timeSpent)}</span> of practice
      </div>

      <footer>
        {/*<button className="go-to-next">Go to next retype!</button>*/}
        <button className="go-to-next" onClick={() => window.location.reload()} ref={goToNextButtonRef}>
          Restart ⟳
        </button>
        <br />
        {/*<button className="go-to-restart">Restart ⟳</button>*/}
      </footer>
    </section>
  );
}
