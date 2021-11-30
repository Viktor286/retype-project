import React, {useEffect, useState, useRef} from "react";
import CreateCodeSample from "../../model/CodeSample";
import CodingSession from "../../model/CodingSession";
// import keydownGlobalController from "../../keydownGlobalController";
import {fetchGithubResource} from "../../modules/fetchGithubResource";
import InfoPanel from "../InfoPanel";
import CodingArea from "../CodingArea";
import LandingPage from "../LandingPage";
import CodingAreaHeader from "../CodingAreaHeader";
import {jsonObjCopy, logLocalStorageStat} from "../../utils/misc";

import "../../Globals.css";

export default function CodeTrainerApp() {
  const [trainerApp, setTrainerApp] = useState({});
  const [codeSample, setCodeSample] = useState({});
  let { current: isCodeSampleInit } = useRef(false);

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

      setCodeSample(codeSample);
    });
  }, []);

  useEffect(() => {
    if (codeSample.content) {
      const initialCodingSession = new CodingSession({
        content: codeSample.content,
        currentCodeSample: codeSample,
      });

      // INIT component state
      setTrainerApp(() => jsonObjCopy(initialCodingSession.activeState));

      logLocalStorageStat();
    }
  }, [codeSample]);

  useEffect(() => {
    // Init and consecutive trainerApp updates
    if (!isCodeSampleInit && trainerApp.currentCodeSample?.content) {
      isCodeSampleInit = true;
      // document.addEventListener("keydown", e => keydownGlobalController({keydownEvent: e, codeTrainer: trainerApp}));
    } else {
      console.log('trainerApp', trainerApp);
    }
  }, [trainerApp]);

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

  if (trainerApp.hasOwnProperty("currentCodeSample")) {
    return (
      <div className="CodeTrainerApp">
        <CodingAreaHeader currentCodeSample={trainerApp.currentCodeSample}>
          <CodingArea
            currentCodeSample={trainerApp.currentCodeSample}
            cursorIndex={trainerApp.codeArea.cursorIndex}
            characterCorrectness={trainerApp.characterCorrectness}
          />
        </CodingAreaHeader>
        <InfoPanel
          characterCorrectness={trainerApp.characterCorrectness}
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
