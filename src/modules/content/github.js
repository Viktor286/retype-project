import {processLicenseData} from "./licenses";

const githubApiDomain = "https://api.github.com";

export function convertPathnameToFileEndpoint(githubPathname) {
  return `${githubApiDomain}/repos${githubPathname.replaceAll('blob/master', 'contents').replaceAll('blob/main', 'contents')}`;
}

export function validateGithubPath(githubPathname) {
  return githubPathname.length >= 3;
}

export async function fetchGithubResource(githubPathname) {
  if (!validateGithubPath(githubPathname)) {
    return {};
  }

  const url = convertPathnameToFileEndpoint(githubPathname);
  const res = await fetch(url);
  return await res.json();
}

export function getOwnerAndRepoFromGithubUrl(url) {
  const apiRepoPrefixLen = `${githubApiDomain}/repos/`.length;
  const chunk = url.slice(apiRepoPrefixLen);
  const a = chunk.split('/');
  return {owner: a[0], repo: a[1]};
}

// https://docs.github.com/en/rest/reference/licenses
export async function fetchGithubLicense(owner, repo) {
  const res = await fetch(`${githubApiDomain}/repos/${owner}/${repo}/license`);
  return await res.json();
}

export async function fetchGithubLicenseDetails(licenseKey) {
  const res = await fetch(`${githubApiDomain}/licenses/${licenseKey}`);
  return await res.json();
}

export async function obtainCredentials(url) {
  const {owner, repo} = getOwnerAndRepoFromGithubUrl(url);
  return await processLicenseData(owner, repo, url);
}

