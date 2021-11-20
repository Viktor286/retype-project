import React, {Component} from "react";
import {connect} from "react-redux";
import InfoPanel from "./components/InfoPanel";
import CodeSample from "./components/CodeSample";
import CodingArea from "./components/CodingArea";
import CodingAreaHeader from "./components/CodingAreaHeader";
import keydownGlobalController from "./keydownGlobalController";
import * as userStatActions from "./model/TodaySessionUserStat";
import initialUserStat from "./model/initialUserStat";
import {jsonObjCopy, logLocalStorageStat} from "./functions/misc";

import "./Globals.css";

class CodeTrainerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      initTodaySessionUserStat
    } = this.props;

    const defaultPath = "/metarhia/impress/contents/impress.js";
    const path = window.location.pathname === '/' ? defaultPath : window.location.pathname.replaceAll('blob/master', 'contents');
    const url = `https://api.github.com/repos${path}`;

    fetch(url)
      .then(res => res.json())
      .then((data) => {

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

        // codeSamplesPlaylist[this.getIndexForPlaylistStart(codeSamplesPlaylist)];
        this.setState(() => jsonObjCopy(initialCodeSample.activeState));

        logLocalStorageStat();

        // Add global key listener
        document.addEventListener("keydown", this.keydownGlobalControllerWrapper);

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
    document.removeEventListener("keydown", this.keydownGlobalControllerWrapper);
  }

  keydownGlobalControllerWrapper = e => keydownGlobalController({keydownEvent: e, codeTrainer: this});

  render() {
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
      return <div className="CodeTrainerApp">loading...</div>;
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
