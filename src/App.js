import React, { Component } from "react";

import CodeSampleExplorer from "./components/CodeSampleExplorer";
import CodeSampleControls from "./components/CodeSampleControls";
import ControlPanel from "./components/ControlPanel";
import CodingArea from "./components/CodingArea";

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
    this.state = this.jsonObjCopy(initialCodeSample.state);

    // Short static version of state for navigation comp
    this.staticState = {
      codeSampleList: MockDB.map(elm => ({
        id: elm.id,
        title: elm.title
      }))
    };
  }

  jsonObjCopy = obj => JSON.parse(JSON.stringify(obj));

  updateCodingAreaState = (cursor, action) => {
    let currentCharStateCode = 0;

    this.setState(prevState => {
      // Move cursor
      let nextCursorIndex = 0; // default

      if (action === "delete") {
        nextCursorIndex = this.getGoNextCursor(prevState.codeArea.cursorIndex);
        currentCharStateCode = 0; // reset state
      }

      if (action === "backspace") {
        nextCursorIndex = this.getGoPrevCursor(prevState.codeArea.cursorIndex);
        currentCharStateCode = 0; // reset state
      }

      if (action === "match") {
        nextCursorIndex = this.getGoNextCursor(prevState.codeArea.cursorIndex);
        currentCharStateCode = 1; // ok state
      }

      if (action === "mistake") {
        nextCursorIndex = this.getGoNextCursor(prevState.codeArea.cursorIndex);
        currentCharStateCode = 2; // mistake state
      }

      if (action === "one-forward") {
        nextCursorIndex = this.getGoNextCursor(prevState.codeArea.cursorIndex);
        currentCharStateCode = null; // no-change state
      }

      if (action === "one-backward") {
        nextCursorIndex = this.getGoPrevCursor(prevState.codeArea.cursorIndex);
        currentCharStateCode = null; // no-change state
      }

      // update updateStateObj
      let updateStateObj = {};

      if (currentCharStateCode !== null) {
        const newStat = prevState.characterCorrectness.map.slice(0);

        if (action === "backspace") {
          newStat[cursor - 1] = currentCharStateCode;
        }

        if (action !== "backspace") {
          newStat[cursor] = currentCharStateCode;
        }

        const keysSuccess = newStat.filter(x => x === 1).length;
        const keysLeft = prevState.currentCodeSample.contentLen - keysSuccess;
        const keysLeftPercent = parseInt(
          keysSuccess / (prevState.currentCodeSample.contentLen / 100),
          10
        );

        updateStateObj.characterCorrectness = {
          map: newStat,
          keysLeft,
          keysSuccess,
          keysLeftPercent,
          isComplete: keysLeft <= 0
        };
      }

      updateStateObj.codeArea = { cursorIndex: nextCursorIndex };
      return updateStateObj;
    });
  };

  getGoNextCursor = prevCursorIndex => {
    const textSampleLen = this.state.currentCodeSample.contentLen - 1;
    return prevCursorIndex < textSampleLen
      ? prevCursorIndex + 1
      : prevCursorIndex;
  };

  getGoPrevCursor = prevCursorIndex => {
    return prevCursorIndex > 0 ? prevCursorIndex - 1 : prevCursorIndex;
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
      this.updateCodingAreaState(cursor, "one-forward");
      return true;
    }

    if (e.keyCode === 37) {
      // back
      this.updateCodingAreaState(cursor, "one-backward");
      return true;
    }

    if (e.keyCode === 8) {
      // backspace
      this.updateCodingAreaState(cursor, "backspace");
      return true;
    }

    if (e.keyCode === 46) {
      // delete
      this.updateCodingAreaState(cursor, "delete");
      return true;
    }

    if (e.keyCode === 13 && currentChar && currentChar.charCodeAt(0) === 10) {
      // enter
      this.updateCodingAreaState(cursor, "match");
      return true;
    }

    if (currentChar && currentChar.charCodeAt(0) === 9) {
      // if tab char is expecting
      if (e.keyCode === 9 || e.keyCode === 32) {
        // tab or space will be ok
        this.updateCodingAreaState(cursor, "match");
        return true;
      }
    }

    // Detect match or mistake
    this.updateCodingAreaState(
      cursor,
      e.key === currentChar ? "match" : "mistake"
    );
  };

  componentDidMount() {
    document.addEventListener("keydown", this.globalKeyHandler);
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
        MockDB[idx].state = this.jsonObjCopy(this.state);
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
          />

          <CodingArea
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
