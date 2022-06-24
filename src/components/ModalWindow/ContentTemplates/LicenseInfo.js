import './LicenseInfo.css';

export default function LicenseInfoModalWindowContent({ credentials: { license, licenseOriginUrl } }) {
  return (
    <section className="license-info">
      <p>
        Author's license file: <br />
        <a href={licenseOriginUrl} target="_blank" rel="noreferrer">
          {licenseOriginUrl}
        </a>
      </p>
      <p>
        Overview: <br />
        {license?.body}
      </p>
    </section>
  );
}
