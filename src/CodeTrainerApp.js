import React, {Component} from "react";
import {connect} from "react-redux";
import InfoPanel from "./components/InfoPanel";
import CodeSample from "./model/CodeSample";
import CodingArea from "./components/CodingArea";
import CodingAreaHeader from "./components/CodingAreaHeader";
import keydownGlobalController from "./keydownGlobalController";
import * as userStatActions from "./model/TodaySessionUserStat";
import initialUserStat from "./model/initialUserStat";
import {jsonObjCopy, logLocalStorageStat} from "./utils/misc";
import {fetchGithubResource} from "./modules/fetchGithubResource";

import "./Globals.css";
import logo from "./logo.svg";

class CodeTrainerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    window.codeTrainer = this;
  }

  componentDidMount() {
    const {
      initTodaySessionUserStat
    } = this.props;

    fetchGithubResource(window.location.pathname).then(({content, name}) => {
      if (!content || !name) {
        return;
      }

      // TODO: extract codeAreaInitializer
      // Create code sample to render
      const codeSample = new CodeSample({
        title: name,
        content: decodeURIComponent(escape(window.atob(content))).replaceAll('  ', '\t'),
        alias: name,
        mainCategory: "DOM API"
      });

      // Define userStat collection (localStorage or localData)
      localStorage.clear();
      const LS_userStat = localStorage.getItem("userStat");
      let userStat;
      try {
        userStat = JSON.parse(LS_userStat);
        if (!userStat) throw Error("userStat");
      } catch (e) {
        userStat = initialUserStat;
        localStorage.setItem("userStat", JSON.stringify(userStat));
      }

      // INIT Userstat for redux state
      initTodaySessionUserStat(userStat);

      // INIT component state
      this.setState(() => jsonObjCopy(codeSample.activeState));

      logLocalStorageStat();

      // Add global key listener
      document.addEventListener("keydown", this.keydownGlobalControllerWrapper);

      // Set time tracking
      setInterval(() => {
        // decrease timeCountingDelay if not null
        if (this.state.codeArea.timeCountingDelay > 0) {
          this.setState(prev => { // TODO: extract global state updater
            let exports = {};

            exports.codeArea = {
              ...prev.codeArea,
              timeCountingDelay: prev.codeArea.timeCountingDelay - 1000
            };

            if (!prev.characterCorrectness.isComplete) {
              const timeCounted = prev.characterCorrectness.timeCounted + 1000;
              const cpm = Math.round(
                prev.characterCorrectness.keysSuccess / (timeCounted / 1000 / 60)
              );

              exports.characterCorrectness = {
                ...prev.characterCorrectness,
                timeCounted,
                cpm
              };
            }

            return exports;
          });
        }

        // other timer actions
      }, 1000);
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownGlobalControllerWrapper);
  }

  keydownGlobalControllerWrapper = e => keydownGlobalController({keydownEvent: e, codeTrainer: this});

  render() {
    if (window.location.pathname === '/') {
      return <div className="CodeTrainerApp">
        <section className={"codingAreaHeader"}>
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>
            Github Retype
            <div className="mainCategory">
              speed coder typing trainer
            </div>
            <ul>
              <li><a href="facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js">facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js</a></li>
              <li><a href="numpy/numpy/blob/main/numpy/typing/_array_like.py">numpy/numpy/blob/main/numpy/typing/_array_like.py</a></li>
              <li><a href="Viktor286/code-samples/blob/master/src/Engineering/BinaryTrees/01_preOrder.ts">Viktor286/code-samples/blob/master/src/Engineering/BinaryTrees/01_preOrder.ts</a></li>
            </ul>
          </h2>
        </section>
      </div>
    }

    const {userStat} = this.props;

    if (this.state.hasOwnProperty("currentCodeSample")) {
      return (
        <div className="CodeTrainerApp">
          <CodingAreaHeader currentCodeSample={this.state.currentCodeSample}>
            <CodingArea
              currentCodeSample={this.state.currentCodeSample}
              cursorIndex={this.state.codeArea.cursorIndex}
              characterCorrectnessMap={this.state.characterCorrectness.map}
            />
          </CodingAreaHeader>
          <InfoPanel
            characterCorrectness={this.state.characterCorrectness}
            userStat={userStat}
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
}

const mapStateToProps = state => ({
  ...state
});

export default connect(
  mapStateToProps,
  {...userStatActions}
)(CodeTrainerApp);
