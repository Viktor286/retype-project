export const fetchGithubResource = async (githubPathname) => {
  if (githubPathname.length <= 3) {
    return {};
  }
  const url = `https://api.github.com/repos${githubPathname.replaceAll('blob/master', 'contents').replaceAll('blob/main', 'contents')}`;
  const res = await fetch(url);
  return await res.json();
}
