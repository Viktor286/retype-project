import {processLicenseData} from "./licenses";

const githubApiDomain = "https://api.github.com";

export function convertPathnameToFileEndpoint(githubPathname) {
  // eslint-disable-next-line
  return `${githubApiDomain}/repos${githubPathname.replaceAll(/\/blob\/[^\/]*\//gm, '/contents/')}`;
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

  // TODO:  error response with 403 would usually be because of API rate limit
  // "message":"API rate limit exceeded for
  // next in line would be to make a readable notification for that

  if (res.status === 404) {
    throw new Error('license file not found');
  }

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

