import {useEffect} from 'react';
import "./index.css";
import TimelineTimer from "../TimelineTimer";
import {useDispatch, useSelector} from "react-redux";
import {createHistorySessionStat} from '../../model/HistorySession';
import {initializeUserByAuthData, sendHistoryInfo} from '../../modules/persistance/';
import {signInGithubWithPopup} from "../../modules/persistance/firebase/githubAuth";
import {setUser} from "../../model/redux/auth";

function markBodyAsComplete() {
  window.document.body.classList.add('completed');
}

function unmarkBodyAsComplete() {
  window.document.body.classList.remove('completed');
}

const InfoPanel = ({codeSample, keydownController}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const loginProcedure = async () => {
    const authData = await signInGithubWithPopup(window.codeTrainerApp.auth);
    const userJourneyData = await initializeUserByAuthData(authData, window.codeTrainerApp.auth);
    dispatch(setUser(userJourneyData));
  }

  const {stats, correctness, auth} = state;
  const {cpm, wpm} = stats;
  const {correctAmount, keysLeft, isComplete, mistakes, corrections} = correctness;
  let {uid, userName, photoURL} = auth;
  if (userName === "unknown") userName = '';
  const {totalChars, html_url} = codeSample;
  const codeSamplePath = new URL(html_url).pathname;

  useEffect(() => {
    if (isComplete && codeSamplePath) {
      // Turn off keyboard handler when session completed
      if (correctness.isComplete && keydownController.keydownHandler) {
        document.removeEventListener("keydown", keydownController.keydownHandler);
      }

      if (uid) {
        // Save historySessionData
        const historySessionData = createHistorySessionStat(stats, correctness, codeSamplePath);
        sendHistoryInfo(uid, historySessionData).then(response => {
          // console.log('@@@ historySessionData sent', historySessionData, response);
        });
      }
    }
    // eslint-disable-next-line
  }, [isComplete, uid, codeSamplePath]);

  isComplete ? markBodyAsComplete() : unmarkBodyAsComplete();

  return (
    <section className={"infoPanel" + (isComplete ? " complete" : "")}>
      <div className="separator">&nbsp;</div>
      <div className="ui">
        <section className="left-area">
          <div className="left-user-info">
            {userName && photoURL ? (
              <div className="user-profile logged-in">
                <div className="user-pic">
                  <img src={photoURL} width="48" height="48" alt="user picture"/>
                </div>
                <div className="login">{userName}</div>
              </div>
            ) : (
              <div className="user-profile" onClick={loginProcedure}>
                <div className="user-pic">
                  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="none" height="256" width="256"/>
                    <circle cx="128" cy="120" r="44"/>
                    <path
                      d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm65.8,162.4a81.3,81.3,0,0,0-24.5-23,59.7,59.7,0,0,1-82.6,0,81.3,81.3,0,0,0-24.5,23,88,88,0,1,1,131.6,0Z"/>
                  </svg>
                  {/*<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><circle cx="128" cy="128" fill="none" r="96" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><circle cx="128" cy="120" fill="none" r="40" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M63.8,199.4a72,72,0,0,1,128.4,0" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>*/}
                </div>
                <div className="login"><span>Log in</span></div>
              </div>
            )}

            <div className="user-stat">
              <div className="wpm-indicator" title="Words Per Minute">WPM {wpm}</div>
              <div className="cpm-indicator" title="Chars Per Minute" >CPM {Math.floor(cpm)} / <span title="Chars Per Second">CPS {Math.floor(cpm / 60)}</span></div>
            </div>
          </div>
        </section>
        <section className="center-area">
          <div className="center-info">
            <TimelineTimer totalChars={totalChars} userName={userName}/>
            <div className="footer">
              {/*<div className="up-next">*/}
              {/*  <span className="title">Up next: </span>*/}
              {/*  <a*/}
              {/*    href="TheAlgorithms/Java/blob/master/src/main/java/com/thealgorithms/sorts/SlowSort.java">SlowSort.java</a>*/}
              {/*  <span className="separator"> | </span>*/}
              {/*  <a href="TheAlgorithms/Javascript/blob/master/Sorts/GnomeSort.js">GnomeSort.js</a>*/}
              {/*  <a href="#" className="more-up-next">*/}
              {/*    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-right"*/}
              {/*         className="svg-inline--fa fa-arrow-alt-circle-right fa-w-16" role="img"*/}
              {/*         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">*/}
              {/*      <path fill="currentColor"*/}
              {/*            d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z"/>*/}
              {/*    </svg>*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>
          </div>
        </section>
        <section className="right-area">
          <div className="right-user-info">
            <div className="correct-stat">correct: {correctAmount}<span className="remain">/{keysLeft}</span></div>
            <div className="mistakes-stat">mistakes/fixes: {mistakes}/{corrections}</div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default InfoPanel;
