import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CodeSampleExplorer from "./components/CodeSampleExplorer";
import InfoPanel from "./components/InfoPanel";
import CodingArea from "./components/CodingArea";
import { codingAreaModifier } from "./App/codingAreaModifier";

import * as userStatActions from "./actions/userStat";
import * as codeSamplesActions from "./actions/codeSamples";

import codeSamplesBuiltInDemoPlaylist from "./data/codeSamplesDemoPlaylist";
import initialUserStat from "./data/initialUserStat";

import { jsonObjCopy, logLocalStorageStat } from "./functions/misc";

import logo from "./logo.svg";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateCodingAreaState = action => {
    const {
      userStat,
      updateTodaySessionUserStat,
      updateCodeSampleAsComplete
    } = this.props;

    if (this.state.characterCorrectness.isComplete) {
      return true;
    }

    this.setState(prevState => {
      const newCodingAreaState = codingAreaModifier(prevState, action);

      if (
        // that codeSample has just been completed
        !prevState.characterCorrectness.isComplete &&
        newCodingAreaState.characterCorrectness.isComplete
      ) {
        updateTodaySessionUserStat(newCodingAreaState, userStat);
        updateCodeSampleAsComplete(this.state.currentCodeSample.id);
      }

      return newCodingAreaState;
    });
  };

  getIndexForPlaylistStart = codeSamplesPlaylist => {
    let initialCodeSampleIdx = 0;

    // Get the codeSample info from URL of router if exist
    const codeSampleURLAlias = this.props.match.params.codesample;

    if (codeSampleURLAlias && codeSampleURLAlias.length > 0) {
      initialCodeSampleIdx = codeSamplesPlaylist.findIndex(
        cs => cs.initialState.currentCodeSample.alias === codeSampleURLAlias
      );
    } else {
      // As a fallback, pick random CS for startup
      initialCodeSampleIdx = parseInt(
        Math.random() * codeSamplesPlaylist.length,
        10
      );
    }

    return initialCodeSampleIdx;
  };

  componentDidMount() {
    const {
      initPlaylistForCodeSampleExplorer,
      initTodaySessionUserStat
    } = this.props;

    localStorage.clear();

    // Init codeSamples collection (localStorage or localData)
    const LS_codeSamplesPlaylist = localStorage.getItem("codeSamplesPlaylist");
    let codeSamplesPlaylist;
    try {
      codeSamplesPlaylist = JSON.parse(LS_codeSamplesPlaylist);
      if (!codeSamplesPlaylist) throw Error("codeSamplesPlaylist");
    } catch (e) {
      codeSamplesPlaylist = codeSamplesBuiltInDemoPlaylist;
      localStorage.setItem(
        "codeSamplesPlaylist",
        JSON.stringify(codeSamplesPlaylist)
      );
    }

    // Define userStat collection (localStorage or localData)
    const LS_userStat = localStorage.getItem("userStat");
    let userStat;
    try {
      userStat = JSON.parse(LS_userStat);
      if (!userStat) throw Error("userStat");
    } catch (e) {
      userStat = initialUserStat;
      localStorage.setItem("userStat", JSON.stringify(userStat));
    }

    // INIT Playlist & Userstat for redux state
    initPlaylistForCodeSampleExplorer(codeSamplesPlaylist);
    initTodaySessionUserStat(userStat);

    // INIT CS component state
    const initialCodeSample =
      codeSamplesPlaylist[this.getIndexForPlaylistStart(codeSamplesPlaylist)];
    this.setState(() => jsonObjCopy(initialCodeSample.activeState));

    logLocalStorageStat();

    // Add global key listener
    document.addEventListener("keydown", this.globalKeyHandler);

    // Set time tracking
    setInterval(() => {
      // decrease timeCountingDelay if not null
      if (this.state.codeArea.timeCountingDelay > 0) {
        this.setState(prev => {
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
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Update CodeSample relying to current URL (router)
    console.log("componentDidUpdate ");
    this.updateCodeSampleFromCurrentURL(prevProps);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.globalKeyHandler);
  }

  render() {
    const { userStat } = this.props;
    if (this.state.hasOwnProperty("currentCodeSample")) {
      return (
        <div className="App">
          <section className="sidePanel">
            <CodeSampleExplorer
              currentCodeSampleId={this.state.currentCodeSample.id}
              codeSampleExplorerHandler={this.codeSampleExplorerHandler}
            />
          </section>

          <section className={"codeSample"}>
            <img src={logo} className="App-logo" alt="logo" />
            <h2>
              {this.state.currentCodeSample.title}
              <div className="mainCategory">
                ({this.state.currentCodeSample.mainCategory})
              </div>
            </h2>
            <CodingArea
              currentCodeSample={this.state.currentCodeSample}
              cursorIndex={this.state.codeArea.cursorIndex}
              characterCorrectnessMap={this.state.characterCorrectness.map}
            />
          </section>

          <InfoPanel
            characterCorrectness={this.state.characterCorrectness}
            userStat={userStat}
          />
        </div>
      );
    } else {
      return <div className="App">loading...</div>;
    }
  }

  updateCodeSampleFromCurrentURL = prevProps => {
    const prevCodeSampleAlias = prevProps.match.params.codesample;
    const currentCodeSampleAlias = this.props.match.params.codesample;

    if (prevCodeSampleAlias !== currentCodeSampleAlias) {
      // find id in codeSamples collection
      const nextCodeSampleObj = this.props.codeSamples.filter(
        codeSample =>
          codeSample.initialState.currentCodeSample.alias ===
          currentCodeSampleAlias
      )[0];

      if (this.isCodeSampleObjectValidById(nextCodeSampleObj)) {
        console.log("[URL] UPDATE ");
        this.changeCodeSampleHandler(
          nextCodeSampleObj.initialState.currentCodeSample.id
        );
      }
    }
  };

  isCodeSampleObjectValidById = codeSample => {
    return (
      codeSample &&
      codeSample.hasOwnProperty("initialState") &&
      codeSample.initialState.hasOwnProperty("currentCodeSample") &&
      codeSample.initialState.currentCodeSample.hasOwnProperty("id") &&
      codeSample.initialState.currentCodeSample.id.length > 0
    );
  };

  codeSampleExplorerHandler = action => {
    const { codeSamples, codeSamplesIndex } = this.props;
    let targetId = "";

    switch (action.type) {
      case "RESET_SAMPLE":
        console.log("RESET_SAMPLE ");
        this.changeCodeSampleHandler(action.id, true);
        break;

      case "DISPLAY_TARGET_SAMPLE":
        console.log("DISPLAY_TARGET_SAMPLE");
        this.changeCodeSampleHandler(action.id);
        break;

      case "DISPLAY_NEXT_SAMPLE":
        for (let idx in codeSamplesIndex) {
          if (codeSamplesIndex[idx] === action.id) {
            const next = (parseInt(idx, 10) + 1) % codeSamplesIndex.length;
            targetId = codeSamples[next].activeState.currentCodeSample.id;
          }
        }
        console.log("DISPLAY_NEXT_SAMPLE");
        this.changeCodeSampleHandler(targetId);
        break;

      case "DISPLAY_PREV_SAMPLE":
        for (let idx in codeSamplesIndex) {
          if (codeSamplesIndex[idx] === action.id) {
            const prev =
              (parseInt(idx, 10) + codeSamplesIndex.length - 1) %
              codeSamplesIndex.length;
            targetId = codeSamples[prev].activeState.currentCodeSample.id;
          }
        }
        console.log("DISPLAY_PREV_SAMPLE");
        this.changeCodeSampleHandler(targetId);
        break;

      default:
        break;
    }
  };

  changeCodeSampleHandler = (id, reset = false) => {
    console.log(">> changeCodeSampleHandler ");
    if (!id) {
      return true;
    }

    const { codeSamples, codeSamplesIndex } = this.props;

    const targetCodeSample = codeSamples.filter(
      ({ initialState }) => initialState.currentCodeSample.id === id
    )[0];

    // save state in redux store without update
    // TODO: need fix
    for (let idx in codeSamplesIndex) {
      if (codeSamplesIndex[idx] === this.state.currentCodeSample.id) {
        codeSamples[idx].activeState = jsonObjCopy(this.state);
      }
    }

    const newState = !reset
      ? jsonObjCopy(targetCodeSample.activeState)
      : jsonObjCopy(targetCodeSample.initialState);

    this.setState(
      () => newState,
      () => {
        // const aliasURL =
        //   "/code/" + targetCodeSample.initialState.currentCodeSample.alias;
        // window.history.pushState({ urlPath: aliasURL }, "", aliasURL);
        this.props.history.push(
          targetCodeSample.initialState.currentCodeSample.alias
        );
      }
    );
  };

  globalKeyHandler = e => {
    const cursor = this.state.codeArea.cursorIndex;
    const currentChar = this.state.currentCodeSample.contentAsArray[cursor];
    // console.log("e.keyCode ", e.keyCode);

    // Set custom shortcuts
    if (e.keyCode === 37 && e.ctrlKey) {
      // ctrl+left key
      this.codeSampleExplorerHandler({
        type: "DISPLAY_PREV_SAMPLE",
        id: this.state.currentCodeSample.id
      });
      return true;
    }

    if (e.keyCode === 39 && e.ctrlKey) {
      // ctrl+right key
      this.codeSampleExplorerHandler({
        type: "DISPLAY_NEXT_SAMPLE",
        id: this.state.currentCodeSample.id
      });
      return true;
    }

    // Prevent keys
    if (
      e.keyCode === 9 || // prevent tab behavior
      e.keyCode === 32 // prevent space behavior
    ) {
      e.preventDefault(); //
    }

    // Ctrl + space: page down
    if (e.keyCode === 32 && e.ctrlKey) {
      const pageSize = parseInt(window.innerHeight, 10) - 100;
      window.scroll(0, window.scrollY + pageSize);
      return true;
    }

    if (e.keyCode === 32 && e.shiftKey) {
      const pageSize = parseInt(window.innerHeight, 10) - 100;
      window.scroll(0, window.scrollY - pageSize);
      return true;
    }

    // Bypass other Ctrl shortcut group
    if (e.ctrlKey) {
      return true;
    }

    // Skip some keys
    if (
      e.keyCode === 38 || // up
      e.keyCode === 33 || // page up
      e.keyCode === 34 || // page down
      e.keyCode === 40 || // down
      e.keyCode === 16 || // shift
      e.keyCode === 17 || // control
      e.keyCode === 18 || // alt
      e.keyCode === 20 // caps lock
    ) {
      return true;
    }

    // Skip some key ranges
    if (e.keyCode > 112 && e.keyCode < 123) {
      // F1-F12
      return true;
    }

    // Arrows back/forward
    if (e.keyCode === 39) {
      // forward
      this.updateCodingAreaState({ type: "one-forward", cursor });
      return true;
    }

    if (e.keyCode === 37) {
      // backward
      this.updateCodingAreaState({ type: "one-backward", cursor });
      return true;
    }

    if (e.keyCode === 8) {
      // backspace
      this.updateCodingAreaState({ type: "backspace", cursor });
      return true;
    }

    if (e.keyCode === 46) {
      // delete
      this.updateCodingAreaState({ type: "delete", cursor });
      return true;
    }

    if (e.keyCode === 13 && currentChar && currentChar.charCodeAt(0) === 10) {
      // enter
      this.updateCodingAreaState({ type: "match", cursor });
      return true;
    }

    if (currentChar && currentChar.charCodeAt(0) === 9) {
      // if tab char is expecting
      if (e.keyCode === 9 || e.keyCode === 32) {
        // tab or space will be ok
        this.updateCodingAreaState({ type: "match", cursor });
        return true;
      }
    }

    // Detect match or mistake
    this.updateCodingAreaState({
      type: e.key === currentChar ? "match" : "mistake",
      cursor
    });
  };
}

const mapStateToProps = state => ({
  ...state
});

export default withRouter(
  connect(
    mapStateToProps,
    { ...userStatActions, ...codeSamplesActions }
  )(App)
);
