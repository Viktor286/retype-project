import logo from "../../logo.svg";
import "./index.css";
import {useSelector, useDispatch} from "react-redux";
import {signInGithubWithPopup} from "../../modules/githubAuth";
import {setUser} from "../../model/redux/auth";

function TempLogInButton({user}) {
  const dispatch = useDispatch();

  if (user === 'unknown') {
    return <button onClick={async () => {
      const authData = await signInGithubWithPopup();
      const {displayName} = authData;
      dispatch(setUser(displayName));
      // TODO: setup auth persistence from page to page & page reload
    }}>Login via github
    </button>;
  } else {
    return <h2>{user}</h2>;
  }
}

export default function CodingAreaHeader({currentCodeSample, children}) {
  const {user} = useSelector(state => state.auth);
  const u = new URL(currentCodeSample.html_url);
  return <section className={"codingAreaHeader"}>
    <TempLogInButton user={user} />
    <a href="/"><img src={logo} className="App-logo" alt="logo"/></a>
    <h2>
      {u.pathname}
      <div className="mainCategory">
        <a href={u.href}>{u.href}</a>
      </div>
    </h2>
    {children}
  </section>
}
