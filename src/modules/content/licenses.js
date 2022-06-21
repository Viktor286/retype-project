import { fetchGithubLicense, fetchGithubLicenseDetails } from './github';

const licenseAllowList = [
  'afl-3.0',
  'apache-2.0',
  'artistic-2.0',
  'bsl-1.0',
  'bsd-2-clause',
  'bsd-3-clause',
  'cc',
  'cc0-1.0',
  'cc-by-4.0',
  'cc-by-sa-4.0',
  'wtfpl',
  'ecl-2.0',
  'epl-1.0',
  'epl-2.0',
  'eupl-1.1',
  'agpl-3.0',
  'gpl',
  'gpl-2.0',
  'gpl-3.0',
  'lgpl',
  'lgpl-2.1',
  'lgpl-3.0',
  'isc',
  'lppl-1.3c',
  'ms-pl',
  'mit',
  'mpl-2.0',
  'osl-3.0',
  'postgresql',
  'ofl-1.1',
  'ncsa',
  'unlicense',
  'zlib',
];

export function addLicenseCommentToHtmlTop(codeSample) {
  if (codeSample?.credentials?.license?.body?.length > 10) {
    const CommentNode = document.createComment(`\n\n${codeSample.credentials.license.body}\n\n`);
    document.prepend(CommentNode);
  }
}

async function processLicenseData(owner, repo, url) {
  let license;
  let licenseInfo;
  let licenseAllowed = false;

  try {
    const githubLicenseData = await fetchGithubLicense(owner, repo);
    license = githubLicenseData.license;

    if (license) {
      licenseInfo = await fetchGithubLicenseDetails(license.key);
    }
  } catch (e) {
    // licenseInfo = 'not-found';
    // pass
  }

  if (license && licenseAllowList.includes(license.key) && licenseInfo) {
    licenseAllowed = true;

    // remove extra spaces
    licenseInfo.body = licenseInfo.body.replace(/  +/g, ' ');

    // populate bsd, mit licenses
    if (license.key.startsWith('bsd') || license.key.startsWith('mit')) {
      licenseInfo.body = licenseInfo.body.replace('[year]', new Date().getFullYear().toString());
      licenseInfo.body = licenseInfo.body.replace(
        '[fullname]',
        `the "${owner}" within the code repository named "${repo}" at the https://github.com\nBy URL: ${url}`,
      );
    }
  } else {
    // TODO: finish smart resolver
    // further decision may be
    // permissions: 'commercial-use', "distribution"
    // limitations: (2) ['liability', 'warranty']
    // conditions: (4) ['include-copyright', 'document-changes', 'disclose-source', 'same-license']
  }

  return { license: licenseInfo, owner, repo, licenseAllowed };
}

export { licenseAllowList, processLicenseData };
