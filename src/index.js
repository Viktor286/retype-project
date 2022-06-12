import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import initStore from "./model/redux";
import CodeTrainerApp from "./components/CodeTrainerApp/CodeTrainerApp";
import "./globals.css";
import {prepareAuth} from "./modules/persistence/firebase";
import {setUser} from "./model/redux/auth";
import {initializeUserByAuthData} from "./modules/persistence";
import LandingPage from "./components/LandingPage";
import ModalWindow from "./components/ModalWindow";
// import reportWebVitals from './reportWebVitals';

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

async function entryPoint() {
  if (!store.getState()?.auth?.config) {
    const {authData: githubAuthData, auth} = await prepareAuth(store);
    window.codeTrainerApp.auth = auth;
    const userJourneyData = await initializeUserByAuthData(githubAuthData);
    store.dispatch(setUser(userJourneyData));
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <>
      <Provider store={store}>
        <ModalWindow/>
        {window.location.pathname === '/' ? <LandingPage/> : <CodeTrainerApp/>}
      </Provider>
    </>
  );
}

entryPoint();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      // console.log('Service Worker Registered');
    });
}
