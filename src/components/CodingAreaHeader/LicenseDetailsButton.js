import {enableModalWindow} from "../ModalWindow";
import LicenseInfoModalWindowContent from "../LicenseInfoModalWindowContent";

export default function LicenseDetailsButton({codeSample}) {
  if (!codeSample?.credentials?.license) {
    return (<><br/>(no license found, you may have an owner access)</>);
  }

  return (<><br/>(
    <a href="#license" className="license"
       onClick={() => enableModalWindow(LicenseInfoModalWindowContent(codeSample?.credentials?.license?.body))}>file's
      license details</a>)</>)
}




