import logo from "../../logo.svg";
import "./index.css";

export default function CodingAreaHeader({currentCodeSample, children}) {
  const u = new URL(currentCodeSample.html_url);
  return <section className={"codingAreaHeader"}>
    <img src={logo} className="App-logo" alt="logo"/>
    <h2>
      {u.pathname}
      <div className="mainCategory">
        <a href={u.href}>{u.href}</a>
      </div>
    </h2>
    {children}
  </section>
}
