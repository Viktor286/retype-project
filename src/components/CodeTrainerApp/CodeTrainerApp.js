import React, {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch, useStore} from "react-redux";
import {initCorrectness} from "../../model/redux/correctness";
import {setCodeSample} from "../../model/redux/sample";
import CreateCodeSample from "../../model/CodeSample";
import keydownGlobalController from "./keydownGlobalController";
import {fetchGithubResource} from "../../modules/fetchGithubResource";
import InfoPanel from "../InfoPanel";
import CodingArea from "../CodingArea";
import CodingAreaHeader from "../CodingAreaHeader";

export default function CodeTrainerApp() {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();
  const store = useStore();
  const codeSample = useSelector(state => state.sample);
  const keydownController = useRef({
    keydownHandler: undefined,
    modelRef: {dispatch, store}
  });

  useEffect(() => {
    if (window.location.pathname.length > 3) {
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

        window.codeTrainerApp.codeSample = codeSample; // todo: can we avoid this trick effectively?
        dispatch(setCodeSample(codeSample));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (codeSample.id && !keydownController.current.keydownHandler) {
      // Setup keyboard handlers
      // Setup GlobalController
      keydownController.current.keydownHandler = e => keydownGlobalController({
        keydownEvent: e,
        codeSample, ...keydownController.current.modelRef
      })
      document.addEventListener("keydown", keydownController.current.keydownHandler);

      // init sample validation data
      dispatch(initCorrectness(codeSample));
      setInit(true);

      return () => {
        // eslint-disable-next-line
        document.removeEventListener("keydown", keydownController.current.keydownHandler);
      };
    }
  }, [codeSample, dispatch]);

  if (init) {
    return (
      <div className="CodeTrainerApp">
        <CodingAreaHeader codeSampleUrl={codeSample.html_url}>
          <CodingArea codeSample={codeSample}/>
        </CodingAreaHeader>
        <InfoPanel codeSample={codeSample} parentCurrent={keydownController.current}/>
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
