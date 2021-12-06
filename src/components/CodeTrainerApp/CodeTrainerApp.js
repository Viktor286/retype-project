import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch, useStore} from "react-redux";
import {initCorrectness} from "../../model/redux/correctness";
import CreateCodeSample from "../../model/CodeSample";
import keydownGlobalController from "../../keydownGlobalController";
import {fetchGithubResource} from "../../modules/fetchGithubResource";
import InfoPanel from "../InfoPanel";
import CodingArea from "../CodingArea";
import LandingPage from "../LandingPage";
import CodingAreaHeader from "../CodingAreaHeader";

import "../../Globals.css";

export default function CodeTrainerApp() {
  const [codeSample, setCodeSample] = useState({});
  const dispatch = useDispatch();
  const store = useStore();
  const correctness = useSelector(state => state.correctness);
  const { map, cursorIndex } = correctness;
  let {current} = useRef({
    keydownGlobalControllerInit: false,
    globalControllerPayload: {dispatch, store}
  });

  useEffect(() => {
    fetchGithubResource(window.location.pathname).then(githubResource => {
      const {content, name, html_url} = githubResource;

      if (!content || !name) {
        return;
      }

      const codeSample = CreateCodeSample({
        title: name,
        content,
        alias: name,
        mainCategory: "DOM API",
        html_url
      });

      window.codeTrainerApp.codeSample = codeSample;
      setCodeSample(codeSample);
    });
  }, []);

  useEffect(() => {
    console.log('INIT useEffect');
    if (codeSample.content && !current.keydownGlobalControllerInit) {
      current.globalControllerPayload.dispatch(initCorrectness(codeSample.contentLen));
      const keydownHandler = e => keydownGlobalController({keydownEvent: e, codeSample, ...current.globalControllerPayload})
      document.addEventListener("keydown", keydownHandler);
      current.keydownGlobalControllerInit = true;
      return () => {
        document.removeEventListener("keydown", keydownHandler);
      }
    }
  }, [codeSample, current]);

// Set time tracking
  // setInterval(() => {
  //   // decrease timeCountingDelay if not null
  //   if (trainerApp.codeArea.timeCountingDelay > 0) {
  //     setTrainerApp(prev => { // TODO: extract global state updater
  //       let exports = {};
  //
  //       exports.codeArea = {
  //         ...prev.codeArea,
  //         timeCountingDelay: prev.codeArea.timeCountingDelay - 1000
  //       };
  //
  //       if (!prev.characterCorrectness.isComplete) {
  //         const timeCounted = prev.characterCorrectness.timeCounted + 1000;
  //         const cpm = Math.round(
  //           prev.characterCorrectness.keysSuccess / (timeCounted / 1000 / 60)
  //         );
  //
  //         exports.characterCorrectness = {
  //           ...prev.characterCorrectness,
  //           timeCounted,
  //           cpm
  //         };
  //       }
  //
  //       return exports;
  //     });
  //   }
  //
  //   // other timer actions
  // }, 1000);

  if (window.location.pathname === '/') {
    return <LandingPage/>;
  }

  if (map.length > 0) {
    return (
      <div className="CodeTrainerApp">
        <CodingAreaHeader currentCodeSample={codeSample}>
          <CodingArea
            currentCodeSample={codeSample}
            cursorIndex={cursorIndex}
            characterCorrectness={map}
          />
        </CodingAreaHeader>
        <InfoPanel
          correctness={correctness}
        />
      </div>
    );
  } else {
    return <div className="CodeTrainerApp">
      <section className={"codingAreaHeader"}>
        <h2>Loading...</h2>
      </section>
    </div>;
  }
}
