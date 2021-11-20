import React from "react";
import logo from "../../logo.svg";
import "./index.css";

export default function CodingAreaHeader({currentCodeSample, children}) {
  return <section className={"codingAreaHeader"}>
    <img src={logo} className="App-logo" alt="logo"/>
    <h2>
      {currentCodeSample.title}
      <div className="mainCategory">
        ({currentCodeSample.mainCategory})
      </div>
    </h2>
    {children}
  </section>
}
