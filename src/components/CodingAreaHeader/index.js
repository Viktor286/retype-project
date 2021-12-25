import {useEffect, useState} from 'react';
import {getTopSvgIcon, defaultTopSvgIcon} from "./topIconIndex";
import gitHubIcon from './github-brands.svg'
import "./index.css";

// import {useSelector, useDispatch} from "react-redux";
// import {signInGithubWithPopup} from "../../modules/firebase/githubAuth";
// import {setUser} from "../../model/redux/auth";

// function TempLogInButton({user}) {
//   const dispatch = useDispatch();
//   if (user === 'unknown') {
//     return <button onClick={async () => {
//       const authData = await signInGithubWithPopup();
//       const {displayName} = authData;
//       dispatch(setUser(displayName));
//     }}>Login via github
//     </button>;
//   } else {
//     return <h2>{user}</h2>;
//   }
// }

export default function CodingAreaHeader({currentCodeSample, children}) {
  const [icon, setIcon] = useState(defaultTopSvgIcon);
  const [isHiding, setIsHiding] = useState(true);
  // const {user} = useSelector(state => state.auth);
  useEffect(() => {
    getTopSvgIcon().then(svg => {
      if (svg.startsWith('<svg')) {
        setIcon(svg);
      }
      setIsHiding(false);
    })
  }, []);

  const u = new URL(currentCodeSample.html_url);
  return <section className={"codingAreaHeader"}>
    {/*<TempLogInButton user={user} />*/}
    <a href="/" dangerouslySetInnerHTML={{__html: icon}} className={`app-logo ${isHiding ? 'hiding' : ''}`} />
    <h2>
      {u.pathname}
      <div className="mainCategory">
        <a href={u.href}><img src={gitHubIcon} alt="code resource on the github.com" title="the origin of this code resource at github.com"/>{u.pathname}</a><sup className="copyright" title={`the license type and the origin of this resource could be found at ${u.href}`}>©</sup>
      </div>
    </h2>
    {children}
  </section>
}
