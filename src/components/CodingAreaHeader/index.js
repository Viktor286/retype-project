import {useEffect, useState} from 'react';
import {getTopSvgIcon, defaultTopSvgIcon} from "./topIconIndex";
import gitHubIcon from './github-brands.svg';
import "./index.css";

import {useSelector, useDispatch} from "react-redux";
import {signInGithubWithPopup} from "../../modules/persistance/firebase/githubAuth";
import {initializeUserByAuthData} from "../../modules/persistance";
import {setUser} from "../../model/redux/auth";
import LicenseDetailsButton from "./LicenseDetailsButton";

export function TempLogInButton({user}) {
  const dispatch = useDispatch();

  if (user === 'unknown') {
    return <button className={"loginBtn"} onClick={async () => {
      const authData = await signInGithubWithPopup(window.codeTrainerApp.auth);
      const userJourneyData = await initializeUserByAuthData(authData, window.codeTrainerApp.auth);
      dispatch(setUser(userJourneyData));
    }}>Login here via github to keep your stats
    </button>;
  } else {
    return <h2>{user}</h2>;
  }
}

export default function CodingAreaHeader({codeSampleUrl, children}) {
  const [icon, setIcon] = useState(defaultTopSvgIcon);
  const [isHiding, setIsHiding] = useState(true);
  const {auth, sample: codeSample} = useSelector(state => state);
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
    <TempLogInButton user={auth.userName} />
    <a href="/" className={`app-logo ${isHiding ? 'hiding' : ''}`} dangerouslySetInnerHTML={{__html: icon}} />
    <div className="mainCategory">
      <a href={u.href}><img src={gitHubIcon} alt="code resource on the github.com" title="the origin of this code resource at github.com"/>{decodeURI(u.pathname)}</a><sup className="copyright" title={`the license type and the origin of this resource could be found at ${u.href}`}>©</sup>
      <LicenseDetailsButton codeSample={codeSample} />
    </div>
    {children}
  </section>
}
