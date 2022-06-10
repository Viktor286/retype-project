import React from 'react';
// import {getTopSvgIcon, defaultTopSvgIcon} from "./topIconIndex";
import gitHubIcon from './github-brands.svg';
import "./index.css";

import LicenseDetailsButton from "./LicenseDetailsButton";

function CodingAreaHeader({codeSample}) {
  const {html_url: codeSampleUrl} = codeSample;
  // const [icon, setIcon] = useState(defaultTopSvgIcon);
  // const [isHiding, setIsHiding] = useState(true);
  const u = new URL(codeSampleUrl);

  // useEffect(() => {
  //   // load icon async
  //   getTopSvgIcon().then(svg => {
  //     if (svg.startsWith('<svg')) {
  //       setIcon(svg);
  //     }
  //     setIsHiding(false);
  //   })
  // }, []);

  return <>
    <a href="/" className="home-logo">
      <div className="retype-logo">
        <div className="logo-icon">Rt</div>
        <div className="left-side">
          <div className="text-title">Retype_</div>
          <div className="sub-title">project</div>
        </div>
      </div>
    </a>
    {/*<a href="/" className={`app-logo ${isHiding ? 'hiding' : ''}`} dangerouslySetInnerHTML={{__html: icon}}/>*/}
    <div className="mainCategory">
      <a href={u.href}><img src={gitHubIcon} alt="code resource on the github.com"
                            title="the origin of this code resource at github.com"/>{decodeURI(u.pathname)}</a><sup
      className="copyright"
      title={`the license type and the origin of this resource could be found at ${u.href}`}>©</sup>
      <LicenseDetailsButton codeSample={codeSample}/>
    </div>
  </>
}

export default React.memo(CodingAreaHeader);
