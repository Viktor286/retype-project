import Timer from '../../modules/timer';
import "./index.css";
import {useEffect, useRef, useMemo, useState} from "react";

const statRatios = {
  averageCps: 2.4,
  bestCps: 5.7
};

function TimelineTimer({totalChars, isComplete, keysCompletedPercent, staleTimeout}) {
  // Init timer (probably will go higher in tree)
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
  const [allowComparativeProgress, setAllowComparativeProgress] = useState(1);
  let timer = useRef(undefined);

  const bestTimeLimitMs =  useMemo(() => Math.floor(totalChars / statRatios.bestCps) * 1000, [totalChars]);
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
      (millisecondsHighRes) => {
        setElapsedMilliseconds(millisecondsHighRes)
      },
      (seconds) => {
        setElapsedSeconds(seconds);
      }
    );
  }, []);

  // console.log('averageTimeProgress', allowComparativeProgress, averageTimeProgress);
  return <section className="timer">
    <div className="wrap">
      <div className="timer-counter">{Timer.msToTimeString(elapsedSeconds * 1000)}</div>
    </div>
    <div className="timeline">
      <div className="player-time-bar" style={{width: keysCompletedPercent + "%"}}>&nbsp;</div>
      <div className="best-time-bar" style={{width: `${bestTimeProgress >= 100 ? 100 : bestTimeProgress}%`}}>&nbsp;</div>
      <div className="average-time-bar" style={{width: `${averageTimeProgress >= 100 ? 100 : averageTimeProgress}%`}}>&nbsp;</div>
    </div>
  </section>;
}

export default TimelineTimer;
