import React, { Component } from "react";

import CodeSampleExplorer from "./components/CodeSampleExplorer";
import CodeSampleControls from "./components/CodeSampleControls";

import MockDB from "./components/MockDB";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.staticState = {
      codeSampleList: MockDB.map(elm => ({
        id: elm.id,
        title: elm.title
      }))
    };

    const initialCodeSample = MockDB[0];
    this.state = Object.assign({}, initialCodeSample.state);
  }

  updateCodingAreaState = (cursor, action) => {
    let currentCharStateCode = 0;

    this.setState(prev => {
      let updateStateObj = {};

      // Move cursor
      let nextCursorIndex = 0; // default

      if (action === "delete") {
        nextCursorIndex = this.getGoNextCursor(prev.cursorIndex);
        currentCharStateCode = 0; // reset state
      }

      if (action === "backspace") {
        nextCursorIndex = this.getGoPrevCursor(prev.cursorIndex);
        currentCharStateCode = 0; // reset state
      }

      if (action === "match") {
        nextCursorIndex = this.getGoNextCursor(prev.cursorIndex);
        currentCharStateCode = 1; // ok state
      }

      if (action === "mistake") {
        nextCursorIndex = this.getGoNextCursor(prev.cursorIndex);
        currentCharStateCode = 2; // mistake state
      }

      if (action === "one-forward") {
        nextCursorIndex = this.getGoNextCursor(prev.cursorIndex);
        currentCharStateCode = null; // no-change state
      }

      if (action === "one-backward") {
        nextCursorIndex = this.getGoPrevCursor(prev.cursorIndex);
        currentCharStateCode = null; // no-change state
      }

      // update stat object
      if (currentCharStateCode !== null) {
        const newStat = prev.stat.slice(0);

        if (action === "backspace") {
          newStat[cursor - 1] = currentCharStateCode;
        }

        if (action !== "backspace") {
          newStat[cursor] = currentCharStateCode;
        }

        updateStateObj["stat"] = newStat;

        let keysSuccess = newStat.filter(x => x === 1).length;
        updateStateObj["keysSuccess"] = keysSuccess;
        updateStateObj["keysLeft"] = this.state.keysAmount - keysSuccess;
        updateStateObj["keysLeftPercent"] = parseInt(
          keysSuccess / (this.state.keysAmount / 100),
          10
        );
      }

      updateStateObj["cursorIndex"] = nextCursorIndex;
      return updateStateObj;
    });
  };

  getGoNextCursor = prevCursorIndex => {
    const textSampleLen = this.state.mainTextSample.length - 1;
    return prevCursorIndex < textSampleLen
      ? prevCursorIndex + 1
      : prevCursorIndex;
  };

  getGoPrevCursor = prevCursorIndex => {
    return prevCursorIndex > 0 ? prevCursorIndex - 1 : prevCursorIndex;
  };

  globalKeyHandler = e => {
    if (
      e.keyCode === 9 || // prevent tab behavior
      e.keyCode === 32 // space
    ) {
      e.preventDefault(); //
    }

    // console.log('globalKeyHandler ', e);
    // console.log(e.key, e.keyCode);

    const cursor = this.state.cursorIndex;

    if (cursor > this.state.mainTextSampleArr.length) {
      // check mistakes

      // all complete
      this.setState(() => ({ isComplete: true }));
      return true;
    }

    const currentChar = this.state.mainTextSampleArr[cursor];

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

  renderCodingArea = (char, idx) => {
    let displayChar = char;

    // Markup
    let cssClasses = ["char"];

    if (this.state.cursorIndex === idx) {
      cssClasses[cssClasses.length] = "cursor";
    }

    if (this.state.stat[idx] === 0) {
      cssClasses[cssClasses.length] = "await";
    }

    if (this.state.stat[idx] === 1) {
      cssClasses[cssClasses.length] = "ok";
    }

    if (this.state.stat[idx] === 2) {
      cssClasses[cssClasses.length] = "mistake";
    }

    // 'enter' character output case
    if (char.charCodeAt(0) === 10) {
      cssClasses[cssClasses.length] = "lineBreak";
      displayChar = "↵";
    }

    // tab character output case
    if (char.charCodeAt(0) === 9) {
      cssClasses[cssClasses.length] = "tab";
      displayChar = "⇥";
    }

    return (
      <span key={idx} className={cssClasses.join(" ")}>
        {displayChar}
      </span>
    );
  };

  changeCodeSampleHandler = e => {
    const newCodeSampleId = e.target.dataset.id;
    const newCodeSample = MockDB.filter(elm => elm.id === newCodeSampleId)[0];

    // save state in DB
    for (let idx in MockDB) {
      if (MockDB[idx].id === this.state.currentCodeSampleId) {
        MockDB[idx].state = Object.assign({}, this.state);
      }
    }

    // update active state
    this.setState(() => newCodeSample.state);
  };

  controlsResetHandler = e => {
    e.preventDefault();
    // e.target

    this.setState(() => {
      return {
        cursorIndex: 0,
        stat: new Array(this.state.keysAmount).fill(0),
        isComplete: false,
        keysLeft: 0,
        keysSuccess: 0,
        keysLeftPercent: 0,
        linesSuccess: 0
      };
    });
  };

  controlsPrevHandler = e => {
    e.preventDefault();
    let targetId = "";
    for (let idx in MockDB) {
      if (MockDB[idx].id === this.state.currentCodeSampleId) {
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
      if (MockDB[idx].id === this.state.currentCodeSampleId) {
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
          currentCodeSampleId={this.state.currentCodeSampleId}
          changeCodeSampleHandler={this.changeCodeSampleHandler}
        />

        <header className="App-header" onKeyDown={this.globalKeyHandler}>
          <img src={logo} className="App-logo" alt="logo" />
          <div>{this.state.isComplete ? <h1>Complete!</h1> : null}</div>

          <div className="statPanelNumbers">
            {this.state.keysSuccess}
            <span className="keysLeft"> / {this.state.keysLeft}</span>
          </div>

          <section className="codingArea">
            <div id="progressbar">
              <div style={{ width: this.state.keysLeftPercent + "%" }}>
                &nbsp;
              </div>
            </div>
            {this.state.mainTextSampleArr.map(this.renderCodingArea)}
          </section>
        </header>
      </div>
    );
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.globalKeyHandler);
  }
}

export default App;
