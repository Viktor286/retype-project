import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch, useStore} from "react-redux";
import {incrementStaleTimeout, initCorrectness} from "../../model/redux/correctness";
import CreateCodeSample from "../../model/CodeSample";
import keydownGlobalController from "./keydownGlobalController";
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
  const { correctAs2dArray, cursorIndex } = correctness;
  let {current} = useRef({
    keydownHandler: undefined,
    pageInactiveHandler: undefined,
    staleTimeoutCounter: undefined,
    globalControllerPayload: {dispatch, store}
  });

  useEffect(() => {
    fetchGithubResource(window.location.pathname).then(async githubResource => {
      const {content, name, html_url} = githubResource;

      if (!content || !name) {
        return;
      }

      const codeSample = await CreateCodeSample({
        fileName: name,
        content,
        html_url
      });

      window.codeTrainerApp.codeSample = codeSample;
      setCodeSample(codeSample);
    });
  }, []);

  useEffect(() => {
    // Setup keyboard handlers
    if (codeSample.id && !current.keydownHandler) {
      // Setup GlobalController
      current.globalControllerPayload.dispatch(initCorrectness());
      current.keydownHandler = e => keydownGlobalController({keydownEvent: e, codeSample, ...current.globalControllerPayload})
      document.addEventListener("keydown", current.keydownHandler);

      // Setup inactivity timer (drops every keyboard action)
      current.staleTimeoutCounter = setInterval(() => current.globalControllerPayload.dispatch(incrementStaleTimeout(1)), 1000);

      // Make stale if page inactive
      current.pageInactiveHandler = () => current.globalControllerPayload.dispatch(incrementStaleTimeout(999))
      window.addEventListener('blur', current.pageInactiveHandler);

      return () => {
        document.removeEventListener("keydown", current.keydownHandler);
        document.removeEventListener('blur', current.pageInactiveHandler);
        clearInterval(current.staleTimeoutCounter);
      };
    }

    // Turn off keyboard handler when session completed
    if (correctness.isComplete && current.keydownHandler) {
      document.removeEventListener("keydown", current.keydownHandler);
    }
  }, [codeSample, current, correctness.isComplete]);

  if (window.location.pathname === '/') {
    return <LandingPage/>;
  }

  if (correctAs2dArray.length > 1) {
    return (
      <div className="CodeTrainerApp">
        <CodingAreaHeader codeSampleUrl={codeSample.html_url}>
          <CodingArea
            currentCodeSample={codeSample}
            cursorIndex={cursorIndex}
            characterCorrectness={correctAs2dArray}
          />
        </CodingAreaHeader>
        <InfoPanel
          correctness={correctness}
          totalChars={codeSample.totalChars}
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
