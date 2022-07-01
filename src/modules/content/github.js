import { processLicenseData } from './licenses';

export const githubApiDomain = 'https://api.github.com';

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
  return { owner: a[0], repo: a[1] };
}

export async function obtainCredentials(url) {
  const { owner, repo } = getOwnerAndRepoFromGithubUrl(url);
  return await processLicenseData(owner, repo, url);
}
