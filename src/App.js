import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CodeSampleExplorer from "./components/CodeSampleExplorer";
import ControlPanel from "./components/ControlPanel";
import CodingArea from "./components/CodingArea";
import { codingAreaModifier } from "./App/codingAreaModifier";

import updateTodaySessionUserStat from "./actions/userStat";

import codeSamplesDataBase from "./testData/MockDB";

import { jsonObjCopy } from "./functions/misc";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateCodingAreaState = action => {
    const { dispatch, userStat } = this.props;

    if (this.state.characterCorrectness.isComplete) {
      return true;
    }

    this.setState(prevState => {
      const newCodingAreaState = codingAreaModifier(prevState, action);

      if (
        !prevState.characterCorrectness.isComplete &&
        newCodingAreaState.characterCorrectness.isComplete
      ) {
        dispatch(updateTodaySessionUserStat(newCodingAreaState, userStat));
      }

      return newCodingAreaState;
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: "INIT_COLLECTION", collection: codeSamplesDataBase });
    // INIT_USERSTAT

    // init codeSample
    let initialCodeSample = {};

    // Get the codeSample info from URL of router if exist
    const codeSampleAlias = this.getCodeSampleAliasFromRouterURL();

    if (
      codeSampleAlias &&
      codeSampleAlias.length > 0 &&
      codeSampleAlias !== "/"
    ) {
      initialCodeSample = codeSamplesDataBase.filter(
        elm => elm.initialState.currentCodeSample.alias === codeSampleAlias
      )[0];
    }

    if (!this.isCodeSampleObjectValidById(initialCodeSample)) {
      // ELSE, pick random initial codeSample object with included state
      const randomIdx = parseInt(
        Math.random() * codeSamplesDataBase.length,
        10
      );
      initialCodeSample = codeSamplesDataBase[randomIdx];
    }

    // Init state
    this.setState(() => jsonObjCopy(initialCodeSample.activeState));

    document.addEventListener("keydown", this.globalKeyHandler);

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
    const prevCodeSampleAlias = this.getCodeSampleAliasFromRouterURL(prevProps);
    const nextCodeSampleAlias = this.getCodeSampleAliasFromRouterURL();

    if (prevCodeSampleAlias !== nextCodeSampleAlias) {
      // find id in codeSamples collection
      const nextCodeSampleObj = this.props.codeSamples.filter(
        codeSample =>
          codeSample.initialState.currentCodeSample.alias ===
          nextCodeSampleAlias
      )[0];

      if (this.isCodeSampleObjectValidById(nextCodeSampleObj)) {
        this.changeCodeSampleHandler(
          nextCodeSampleObj.initialState.currentCodeSample.id
        );
      }
    }
  }

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
    const { codeSamples } = this.props;
    let targetId = "";

    switch (action.type) {
      case "RESET_SAMPLE":
        this.changeCodeSampleHandler(action.id, true);
        break;

      case "DISPLAY_TARGET_SAMPLE":
        this.changeCodeSampleHandler(action.id);
        break;

      case "DISPLAY_NEXT_SAMPLE":
        for (let idx in codeSamples) {
          if (codeSamples[idx].activeState.currentCodeSample.id === action.id) {
            targetId =
              codeSamples[(parseInt(idx, 10) + 1) % codeSamples.length]
                .activeState.currentCodeSample.id;
          }
        }
        this.changeCodeSampleHandler(targetId);
        break;

      case "DISPLAY_PREV_SAMPLE":
        for (let idx in codeSamples) {
          if (codeSamples[idx].activeState.currentCodeSample.id === action.id) {
            targetId =
              codeSamples[
                (parseInt(idx, 10) + codeSamples.length - 1) %
                  codeSamples.length
              ].activeState.currentCodeSample.id;
          }
        }
        this.changeCodeSampleHandler(targetId);
        break;

      default:
        break;
    }
  };

  getCodeSampleAliasFromRouterURL = props => {
    // // alternative way is to use pathname, which could be faster
    // const pathname = props
    //   ? props.location.pathname
    //   : this.props.location.pathname;
    // return pathname.slice(6); // '/code/' = 6 chars

    return props
      ? props.match.params.codesample
      : this.props.match.params.codesample;
  };

  changeCodeSampleHandler = (id, reset = false) => {
    if (!id) {
      return true;
    }

    const { codeSamples } = this.props;

    const newCodeSample = codeSamples.filter(
      ({ initialState }) => initialState.currentCodeSample.id === id
    )[0];

    if (!reset) {
      // save state in DB
      for (let idx in codeSamples) {
        if (
          codeSamples[idx].initialState.currentCodeSample.id ===
          this.state.currentCodeSample.id
        ) {
          codeSamples[idx].activeState = jsonObjCopy(this.state);
        }
      }
      // Update active to next codeSample state

      this.setState(
        () => newCodeSample.activeState,
        () => {
          this.props.history.push(
            newCodeSample.initialState.currentCodeSample.alias
          );
        }
      );
    } else {
      // Reset to initialState
      this.setState(() => newCodeSample.initialState);
    }
  };

  render() {
    const { userStat } = this.props;
    if (this.state.hasOwnProperty("currentCodeSample")) {
      return (
        <div className="App">
          <CodeSampleExplorer
            currentCodeSampleId={this.state.currentCodeSample.id}
            codeSampleExplorerHandler={this.codeSampleExplorerHandler}
          />

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ControlPanel
              characterCorrectness={this.state.characterCorrectness}
              userStat={userStat}
            />
            <CodingArea
              currentCodeSample={this.state.currentCodeSample}
              cursorIndex={this.state.codeArea.cursorIndex}
              characterCorrectnessMap={this.state.characterCorrectness.map}
            />
          </header>
        </div>
      );
    } else {
      return <div className="App">loading...</div>;
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.globalKeyHandler);
  }

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
  codeSamples: state.codeSamples,
  userStat: state.userStat
});

export default withRouter(connect(mapStateToProps)(App));
