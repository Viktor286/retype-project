import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch, useStore} from "react-redux";
import {initCorrectness} from "../../model/redux/correctness";
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
    keydownGlobalControllerInit: false,
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
    if (codeSample.id && !current.keydownGlobalControllerInit) {
      current.globalControllerPayload.dispatch(initCorrectness());

      const keydownHandler = e => keydownGlobalController({keydownEvent: e, codeSample, ...current.globalControllerPayload})
      document.addEventListener("keydown", keydownHandler);
      current.keydownGlobalControllerInit = true;
      return () => {
        document.removeEventListener("keydown", keydownHandler);
      }
    }
  }, [codeSample, current]);

  if (window.location.pathname === '/') {
    return <LandingPage/>;
  }

  if (correctAs2dArray.length > 1) {
    return (
      <div className="CodeTrainerApp">
        <CodingAreaHeader currentCodeSample={codeSample}>
          <CodingArea
            currentCodeSample={codeSample}
            cursorIndex={cursorIndex}
            characterCorrectness={correctAs2dArray}
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
