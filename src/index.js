import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

import App from "./App";

import "./css/Globals.css";
import * as serviceWorker from "./serviceWorker";

window.debugLogConfig = {
  "redux-log": 0,
  changeCodeSample: 1,
  codeSampleComplete: 1,
  saveCodeSamplesPlaylistToLS: 1
};
const store = configureStore();

const Main = (
  <Provider store={store}>
        <App />
  </Provider>
);

ReactDOM.render(Main, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
