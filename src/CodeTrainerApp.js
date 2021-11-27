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

    fetchGithubResource(window.location.pathname).then(githubResource => {
      const {content, name, html_url} = githubResource;

      if (!content || !name) {
        return;
      }
      console.log('githubResource', githubResource);

      // TODO: extract codeAreaInitializer
      // Create code sample to render
      const codeSample = new CodeSample({
        title: name,
        content: decodeURIComponent(escape(window.atob(content))).replaceAll('  ', '\t'),
        alias: name,
        mainCategory: "DOM API",
        html_url
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
          <section>
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Github Retype
              <div className="mainCategory">
                speed code typing trainer
              </div>
            </h2>
          </section>

          {/*Keyboard cool image + code attributes*/}

          <section>
            <h2>Practice programming skills with action</h2>
            <p>If your are good at typing text you might noticed that code writing requires a bit different type of skill set.<br />
              So it's important to practice the "special characters flow" of keys like brackets, semicolon, math operators and others.</p>
            <p>The great way to achieve a good results is by retyping real-life code examples. Learn to write code faster mastering your keyboarding technique.<br />
              With great code-typing skill you will get more freedom in creating your projects without paying attention cost to complex pattern of code syntax.<br />
              It also will be a great support in programming interviews.
            </p>
          </section>

          <section>
            <h2>Use "Github Retype" to exercise any code file from the largest repository in the world!</h2>
            <p>Add "retype" text after the "github" domain name to get any kind of file on github as code typing trainer app:</p>
            {/* cool image example */}
          </section>

          <section>
            <h2>Learn new programming languages quickly</h2>
            <p>The world has plenty of different code syntax nowadays and sometimes you need to quickly switch gears between something like python and javascript.</p>
            <p>Just a couple of exercise per day will help you to quickly adapt a new programing language and get the feeling of smooth "syntax flow" more easily.</p>
          </section>

          <section>
            <h2>Try speed code typing training examples</h2>
            <ul>
              <li><a href="TheAlgorithms/C/blob/master/leetcode/src/1.c">TheAlgorithms/C/blob/master/leetcode/src/1.c</a></li>
              <li><a href="TheAlgorithms/Go/blob/master/dynamic/fibonacci.go">TheAlgorithms/Go/blob/master/dynamic/fibonacci.go</a></li>
              <li><a href="facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js">facebook/react/blob/main/packages/react-dom/src/client/ReactDOMHostConfig.js</a></li>
              <li><a href="numpy/numpy/blob/main/numpy/typing/_array_like.py">numpy/numpy/blob/main/numpy/typing/_array_like.py</a></li>
              <li><a href="AppFlowy-IO/appflowy/blob/main/backend/src/application.rs">AppFlowy-IO/appflowy/blob/main/backend/src/application.rs</a></li>
              <li><a href="Viktor286/code-samples/blob/master/src/Engineering/BinaryTrees/01_preOrder.ts">Viktor286/code-samples/blob/master/src/Engineering/BinaryTrees/01_preOrder.ts</a></li>
            </ul>
          </section>

          <section>
            <h2>Take advantage of typing routine</h2>
            <p>Use retyping exercise to switch your focus and attention during the day while still gaining benefits of solid code writing ability.</p>
            <p>Exercise repetition of day-or-two interval helps to increase the quality of sensory and procedural memory.</p>
          </section>

          <section>
            <h2>Discover Github</h2>
            <p>Github is awesome community to discover new ideas, approaches, trends. <br />So, don't forget to checkout <a href="https://github.com/trending?since=weekly">trending repos and developers</a> out there.</p>
          </section>

          {/*if you are beginer, its important to learn first the correct hand and fingers placement (https://www.typing.com/)*/}

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
