import React, {useEffect, useRef} from "react";
import {useSelector, useDispatch, useStore} from "react-redux";
import {initCorrectness} from "../../model/redux/correctness";
import {setCodeSample} from "../../model/redux/sample";
import keydownGlobalController from "./keydownGlobalController";
import obtainCodeSample from "../../modules/content/obtainCodeSample";
import InfoPanel from "../InfoPanel";
import CodingArea from "../CodingArea";
import CodingAreaHeader from "../CodingAreaHeader";

export default function CodeTrainerApp() {
  const dispatch = useDispatch();
  const store = useStore();
  const codeSample = useSelector(state => state.sample);
  const keydownController = useRef({
    keydownHandler: false,
    modelRef: {dispatch, store}
  });

  useEffect(() => {
    if (window.location.pathname.length > 3) {
      obtainCodeSample(window.location.pathname).then(async remoteCodeSample => {
        // Setup keyboard handlers
        // Setup GlobalController
        const keydownHandler = e => keydownGlobalController({
          keydownEvent: e,
          codeSample: remoteCodeSample,
          ...keydownController.current.modelRef
        });

        document.addEventListener("keydown", keydownHandler);
        keydownController.current.keydownHandler = keydownHandler;

        dispatch(initCorrectness(remoteCodeSample)); // not used int current component/tree, no component update
        dispatch(setCodeSample(remoteCodeSample)); // triggers component update
      });
    }
  }, [dispatch]);

  if (codeSample.id) {
    return (
      <div className="CodeTrainerApp">
        <CodingAreaHeader codeSampleUrl={codeSample.html_url}>
          <CodingArea codeSample={codeSample}/>
        </CodingAreaHeader>
        <InfoPanel codeSample={codeSample} keydownController={keydownController.current}/>
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
