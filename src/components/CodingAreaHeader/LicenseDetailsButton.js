import {enableModalWindow} from "../ModalWindow";

export default function LicenseDetailsButton({codeSample}) {
  if (!codeSample?.credentials?.license || codeSample?.credentials?.license?.message === "Not Found") {
    return (<><br/>(no license found, if this is your file you may have an owner access after login)</>);
  }

  return (<><br/>(
    <a href="#license" className="license"
       // onClick={() => enableModalWindow(LicenseInfo(codeSample?.credentials?.license?.body))}>file's
       onClick={() => enableModalWindow('LicenseInfo', {licenseDetails: codeSample?.credentials?.license?.body})}>file's
      license details</a>)</>)
}
