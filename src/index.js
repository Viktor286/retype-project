import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import initStore from "./model/redux";
import CodeTrainerApp from "./components/CodeTrainerApp/CodeTrainerApp";
import "./Globals.css";
import * as serviceWorker from "./serviceWorker";
import {prepareAuth} from "./modules/persistance/firebase";
import {setUser} from "./model/redux/auth";
import {initializeUserByAuthData} from "./modules/persistance";
import LandingPage from "./components/LandingPage";
import ModalWindow from "./components/ModalWindow";

window.debugLogConfig = {
  "redux-log": 0,
  changeCodeSample: 1,
  codeSampleComplete: 1,
  saveCodeSamplesPlaylistToLS: 1
};

window.codeTrainerApp = {
  codeSample: undefined,
  correctness: undefined,
};

const store = initStore();

const Main = (
  <Provider store={store}>
    <ModalWindow />
    {window.location.pathname === '/' ? <LandingPage/> : <CodeTrainerApp/>}
  </Provider>
);

async function entryPoint() {
  if (store.getState()?.auth?.config) {
    // console.log('Auth already initialized');
  } else {
    const { authData: githubAuthData, auth } = await prepareAuth(store);
    const userJourneyData = await initializeUserByAuthData(githubAuthData, auth);
    store.dispatch(setUser(userJourneyData));
  }

  ReactDOM.render(Main, document.getElementById("root"));
}

entryPoint();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
