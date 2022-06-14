import Timer from '../../modules/timer';
import "./index.css";
import {useEffect, useRef, useMemo, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setStaleTimeout, updateSecondStat} from "../../model/redux/stats";
import {getCpm, getWpm} from "../../utils/misc";

const statRatios = {
  averageCps: 2.4,
  bestCps: 5.7
};

function TimelineTimer({totalChars, userName}) {
  const dispatch = useDispatch();
  const {stats, correctness} = useSelector(state => state);
  const {staleTimeout} = stats;
  const {correctAmount, isComplete, keysCompletedPercent} = correctness;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
  const [allowComparativeProgress, setAllowComparativeProgress] = useState(1);
  let timer = useRef(undefined);
  let {current} = useRef({
    pageInactiveHandler: undefined,
    staleTimeoutCounter: undefined,
  });

  const bestTimeLimitMs = useMemo(() => Math.floor(totalChars / statRatios.bestCps) * 1000, [totalChars]);
  const averageTimeLimitMs = useMemo(() => Math.floor(totalChars / statRatios.averageCps) * 1000, [totalChars]);

  if (timer.current) {
    if (staleTimeout >= 3 || isComplete) {
      timer.current.pause();
    }

    if (staleTimeout === 0 && !isComplete) {
      timer.current.play();
    }
  }

  let bestTimeProgress = 100;
  let averageTimeProgress = 100;
  if (allowComparativeProgress) bestTimeProgress = (elapsedMilliseconds / (bestTimeLimitMs / 100));
  if (allowComparativeProgress) averageTimeProgress = (elapsedMilliseconds / (averageTimeLimitMs / 100));

  if (averageTimeProgress > 100 && allowComparativeProgress) {
    timer.current.isTickCallbackActive = false;
    setAllowComparativeProgress(0);
  }

  useEffect(() => {
    // init and start timer
    timer.current = new Timer(
      millisecondsHighRes => setElapsedMilliseconds(millisecondsHighRes),
      seconds => setElapsedSeconds(seconds)
    );

    // Make stale if page inactive
    current.pageInactiveHandler = () => dispatch(setStaleTimeout(999))
    window.addEventListener('blur', current.pageInactiveHandler);

    return () => {
      document.removeEventListener('blur', current.pageInactiveHandler);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(updateSecondStat(
      {
        seconds: elapsedSeconds,
        cpm: getCpm(correctAmount, elapsedSeconds),
        wpm: getWpm(correctAmount, elapsedSeconds)
      }
    )); // inactivity timer drops every keyboard action
    // eslint-disable-next-line
  }, [elapsedSeconds]);

  return <section className="timer">
    <div className="timeline">
      <div className="username">{userName ? userName : "Anonymous"}</div>
      <div className="comparison-label">top result</div>
      <div className="player-time-bar" style={{width: keysCompletedPercent + "%"}}>&nbsp;</div>
      <div className="best-time-bar"
           style={{width: `${bestTimeProgress >= 100 ? 100 : bestTimeProgress}%`}}>&nbsp;</div>
      {/*<div className="average-time-bar"*/}
      {/*     style={{width: `${averageTimeProgress >= 100 ? 100 : averageTimeProgress}%`}}>&nbsp;</div>*/}
    </div>
  </section>;
}

export default TimelineTimer;
