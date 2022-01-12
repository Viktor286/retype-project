import {useEffect, useState} from 'react';
import {getTopSvgIcon, defaultTopSvgIcon} from "./topIconIndex";
import gitHubIcon from './github-brands.svg';
import "./index.css";

import {useSelector, useDispatch} from "react-redux";
import {signInGithubWithPopup} from "../../modules/persistance/firebase/githubAuth";
import {initializeUserByAuthData} from "../../modules/persistance";
import {setUser} from "../../model/redux/auth";

function TempLogInButton({user}) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  if (user === 'unknown') {
    return <button onClick={async () => {
      const authData = await signInGithubWithPopup(auth.auth);
      const userJourneyData = await initializeUserByAuthData(authData, auth.auth);
      dispatch(setUser(userJourneyData));
    }}>Login via github
    </button>;
  } else {
    return <h2>{user}</h2>;
  }
}

export default function CodingAreaHeader({codeSampleUrl, children}) {
  const [icon, setIcon] = useState(defaultTopSvgIcon);
  const [isHiding, setIsHiding] = useState(true);
  const auth = useSelector(state => state.auth);
  const u = new URL(codeSampleUrl);

  useEffect(() => {
    // load icon async
    getTopSvgIcon().then(svg => {
      if (svg.startsWith('<svg')) {
        setIcon(svg);
      }
      setIsHiding(false);
    })
  }, []);

  return <section className={"codingAreaHeader"}>
    <TempLogInButton user={auth.screenName} />
    <a href="/" dangerouslySetInnerHTML={{__html: icon}} className={`app-logo ${isHiding ? 'hiding' : ''}`}/>
    <h2>
      {u.pathname}
      <div className="mainCategory">
        <a href={u.href}><img src={gitHubIcon} alt="code resource on the github.com" title="the origin of this code resource at github.com"/>{u.pathname}</a><sup className="copyright" title={`the license type and the origin of this resource could be found at ${u.href}`}>©</sup>
      </div>
    </h2>
    {children}
  </section>
}
