import './CompletionScreen.css';
import { useSelector } from 'react-redux';
import { secondsToTime } from '../../../utils/misc';
import { getLocalDailyStats } from '../../../model/DailyStats';

export default function CompletionScreenModalWindowContent() {
  const state = useSelector((state) => state);
  const { stats, sample, correctness } = state;

  const { cpm, wpm, elapsedSeconds } = stats;
  const { title: filename, totalChars, html_url } = sample;
  const origin = html_url.slice(19).split('/')[0];

  const { mistakes } = correctness;

  const dailyStats = getLocalDailyStats();
  const { total } = dailyStats;

  return (
    <section className="completion-screen">
      <section className="code-sample-details">
        <div className="filename">
          /{origin}/../{filename}
        </div>
        <div className="chars">Chars: {totalChars}</div>
        <div className="Time">Time: {secondsToTime(elapsedSeconds)}</div>
      </section>

      <h1>Completed!</h1>

      <div className="evaluation-msg">Congrats! You did above avarage.</div>

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
        Today results: {total.chars} chars for {secondsToTime(total.timeSpent)} of practice
      </div>

      <footer>
        <button className="go-to-next">Go to next retype!</button>
        <br />
        <button className="go-to-restart">Restart ⟳</button>
      </footer>
    </section>
  );
}
