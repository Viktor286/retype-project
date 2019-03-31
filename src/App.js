import React, { Component } from "react";

import CodeSampleExplorer from "./components/CodeSampleExplorer";
import CodeSampleControls from "./components/CodeSampleControls";
import ControlPanel from "./components/ControlPanel";
import CodingArea from "./components/CodingArea";
import { codingAreaModifier } from "./App/codingAreaModifier";

import { jsonObjCopy } from "./functions/misc";

import MockDB from "./components/MockDB";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // Pick random initial codeSample object with included state
    const randomIdx = parseInt(Math.random() * MockDB.length, 10);
    const initialCodeSample = MockDB[randomIdx];

    // Init state
    this.state = jsonObjCopy(initialCodeSample.state);

    // Short static version of state for navigation comp
    this.staticState = {
      codeSampleList: MockDB.map(elm => ({
        id: elm.id,
        title: elm.title
      }))
    };
  }

  updateCodingAreaState = action => {
    this.setState(prevState => {
      return codingAreaModifier(prevState, action);
    });
  };

  globalKeyHandler = e => {
    console.log("e.keyCode ", e.keyCode);

    // Set custom shortcuts
    if (e.keyCode === 37 && e.ctrlKey) {
      // ctrl+left key
      this.controlsPrevHandler(e);
      return true;
    }

    if (e.keyCode === 39 && e.ctrlKey) {
      // ctrl+right key
      this.controlsNextHandler(e);
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

    const cursor = this.state.codeArea.cursorIndex;
    const currentChar = this.state.currentCodeSample.contentAsArray[cursor];

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

  componentDidMount() {
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

  componentWillUpdate(nextProps, nextState, nextContext) {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('UPD State -> ', this.state);
  }

  changeCodeSampleHandler = e => {
    const newCodeSampleId = e.target.dataset.id;
    const newCodeSample = MockDB.filter(elm => elm.id === newCodeSampleId)[0];

    // save state in DB
    for (let idx in MockDB) {
      if (MockDB[idx].id === this.state.currentCodeSample.id) {
        MockDB[idx].state = jsonObjCopy(this.state);
      }
    }

    // update active state
    this.setState(() => newCodeSample.state);
  };

  controlsResetHandler = e => {
    e.preventDefault();
    const currentCodeSample = MockDB.filter(
      elm => elm.id === this.state.currentCodeSample.id
    )[0];
    this.setState(() => currentCodeSample.initialState);
  };

  controlsPrevHandler = e => {
    e.preventDefault();
    let targetId = "";
    for (let idx in MockDB) {
      if (MockDB[idx].id === this.state.currentCodeSample.id) {
        targetId =
          MockDB[(parseInt(idx, 10) + MockDB.length - 1) % MockDB.length].id;
      }
    }
    let mimicEvent = { target: { dataset: { id: targetId } } };
    this.changeCodeSampleHandler(mimicEvent);
  };

  controlsNextHandler = e => {
    e.preventDefault();
    let targetId = "";
    for (let idx in MockDB) {
      if (MockDB[idx].id === this.state.currentCodeSample.id) {
        targetId = MockDB[(parseInt(idx, 10) + 1) % MockDB.length].id;
      }
    }
    let mimicEvent = { target: { dataset: { id: targetId } } };
    this.changeCodeSampleHandler(mimicEvent);
  };

  render() {
    return (
      <div className="App">
        <CodeSampleControls
          controlsResetHandler={this.controlsResetHandler}
          controlsPrevHandler={this.controlsPrevHandler}
          controlsNextHandler={this.controlsNextHandler}
        />

        <CodeSampleExplorer
          codeSampleList={this.staticState.codeSampleList}
          currentCodeSampleId={this.state.currentCodeSample.id}
          changeCodeSampleHandler={this.changeCodeSampleHandler}
        />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ControlPanel
            keysSuccess={this.state.characterCorrectness.keysSuccess}
            keysLeft={this.state.characterCorrectness.keysLeft}
            keysLeftPercent={this.state.characterCorrectness.keysLeftPercent}
            isComplete={this.state.characterCorrectness.isComplete}
            timeCounted={this.state.characterCorrectness.timeCounted}
            cpm={this.state.characterCorrectness.cpm}
          />

          <CodingArea
            codeSampleTitle={this.state.currentCodeSample.title}
            mainCategory={this.state.currentCodeSample.mainCategory}
            currentCodeSampleAsArr={this.state.currentCodeSample.contentAsArray}
            cursorIndex={this.state.codeArea.cursorIndex}
            characterCorrectnessMap={this.state.characterCorrectness.map}
          />
        </header>
      </div>
    );
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.globalKeyHandler);
  }
}

export default App;
