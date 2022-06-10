import React, {useEffect, useRef, useState} from "react";
import {useSelector, useDispatch, useStore} from "react-redux";
import {initCorrectness} from "../../model/redux/correctness";
import {setCodeSample} from "../../model/redux/sample";
import keydownGlobalController from "./keydownGlobalController";
import obtainCodeSample from "../../modules/content/obtainCodeSample";
import {addLicenseCommentToHtmlTop} from "../../modules/content/licenses";
import InfoPanel from "../InfoPanel";
import CodingArea from "../CodingArea";
import CodingAreaHeader from "../CodingAreaHeader";
import NoLicenseNotification from "../NoLicenseNotification";
import LicenseInfoModalWindowContent from "../LicenseInfoModalWindowContent";
import {enableModalWindow} from "../ModalWindow";

export default function CodeTrainerApp() {
  const dispatch = useDispatch();
  const store = useStore();
  const [status, setStatus] = useState('Loading...');
  const {sample: codeSample, auth} = useSelector(state => state);
  const { userName } = auth;
  const keydownController = useRef({
    keydownHandler: false,
    modelRef: {dispatch, store}
  });

  useEffect(() => {
    if (window.location.pathname.length > 3 && !codeSample.id) {
      obtainCodeSample(window.location.pathname).then(async remoteCodeSample => {
        if (!remoteCodeSample) {
          return;
        }

        if (typeof remoteCodeSample === "string") {
          setStatus(remoteCodeSample);
          return;
        }

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

        if (remoteCodeSample?.credentials?.license) {
          addLicenseCommentToHtmlTop(remoteCodeSample);
          if (window.location.hash === '#license') {
            enableModalWindow(LicenseInfoModalWindowContent(remoteCodeSample?.credentials?.license?.body));
          }
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  if (
    codeSample.id &&
    (codeSample?.credentials?.license === 'not-found' || !codeSample?.credentials?.licenseAllowed) &&
    codeSample?.credentials?.owner !== userName
  ) {
    return <div className="CodeTrainerApp">
      <CodingAreaHeader codeSampleUrl={codeSample.html_url}>
        <NoLicenseNotification />
      </CodingAreaHeader>
    </div>;
  }

  if (codeSample.id) {
    return (
      <div className="CodeTrainerApp">
        <section className={"codingAreaHeader"}>
          <CodingAreaHeader codeSample={codeSample} />
          <CodingArea codeSample={codeSample}/>
        </section>
        <InfoPanel codeSample={codeSample} keydownController={keydownController.current}/>
      </div>
    );
  } else {
    return <div className="CodeTrainerApp">
      <section className={"codingAreaHeader"}>
        <h2>{status}</h2>
      </section>
    </div>;
  }
}
