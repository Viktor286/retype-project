import './LicenseInfo.css'

export default function LicenseInfoModalWindowContent({licenseDetails = ''}) {
  return <section className="license-info">{licenseDetails}</section>
}
