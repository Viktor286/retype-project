import React, {Component} from "react";
import {connect} from "react-redux";
import InfoPanel from "./components/InfoPanel";
import CodingArea from "./components/CodingArea";
import {codingAreaModifier} from "./App/codingAreaModifier";
import * as userStatActions from "./actions/userStat";
import initialUserStat from "./data/initialUserStat";
import CodeSample from "./data/CodeSample";
import {jsonObjCopy, logLocalStorageStat, debugLog} from "./functions/misc";

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
        debugLog({event: "codeSampleComplete", color: "violet"}, prevState);

        updateTodaySessionUserStat(newCodingAreaState, userStat);

        let activeStateCompleted = jsonObjCopy(this.state);
        activeStateCompleted.characterCorrectness.isComplete = true;
        // TODO redux middleware to save to localStore by flag
      }

      return newCodingAreaState;
    });
  };

  componentDidMount() {
    const {
      initTodaySessionUserStat
    } = this.props;

    const defaultPath = "/metarhia/impress/contents/impress.js";
    const path = window.location.pathname === '/' ? defaultPath : window.location.pathname.replaceAll('blob/master', 'contents');
    const url = `https://api.github.com/repos${path}`;
    console.log('url', url);
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        console.log('data', data);
        const {content, name} = data;
        const codeSample = new CodeSample({
          title: name,
          content: decodeURIComponent(escape(window.atob(content))).replaceAll('  ', '\t'),
          alias: name,
          mainCategory: "DOM API"
        });

        localStorage.clear();

        const codeSamplesPlaylist = [codeSample];

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

        // INIT Userstat for redux state
        initTodaySessionUserStat(userStat);

        // INIT CS component state
        const initialCodeSample = codeSamplesPlaylist[0];
        console.log('initialCodeSample', initialCodeSample);
        // codeSamplesPlaylist[this.getIndexForPlaylistStart(codeSamplesPlaylist)];
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
      })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.globalKeyHandler);
  }

  render() {
    const {userStat} = this.props;
    if (this.state.hasOwnProperty("currentCodeSample")) {
      return (
        <div className="App">
          <section className={"codeSample"}>
            <img src={logo} className="App-logo" alt="logo"/>
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

  globalKeyHandler = e => {
    const cursor = this.state.codeArea.cursorIndex;
    const currentChar = this.state.currentCodeSample.contentAsArray[cursor];

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
      e.metaKey === true || // cmd key
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
      this.updateCodingAreaState({type: "one-forward", cursor});
      return true;
    }

    if (e.keyCode === 37) {
      // backward
      this.updateCodingAreaState({type: "one-backward", cursor});
      return true;
    }

    if (e.keyCode === 8) {
      // backspace
      this.updateCodingAreaState({type: "backspace", cursor});
      return true;
    }

    if (e.keyCode === 46) {
      // delete
      this.updateCodingAreaState({type: "delete", cursor});
      return true;
    }

    if (e.keyCode === 13 && currentChar && currentChar.charCodeAt(0) === 10) {
      // enter
      this.updateCodingAreaState({type: "match", cursor});
      return true;
    }

    if (currentChar && currentChar.charCodeAt(0) === 9) {
      // if tab char is expecting
      if (e.keyCode === 9 || e.keyCode === 32) {
        // tab or space will be ok
        this.updateCodingAreaState({type: "match", cursor});
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

export default connect(
  mapStateToProps,
  {...userStatActions}
)(App);
