// TODO: switch to SWR
// Input: str githubPathname
// Return: {content, name}
export const fetchGithubResource = async (githubPathname) => {
  if (githubPathname.length <= 3) {
    return {};
  }
  const url = `https://api.github.com/repos${githubPathname.replaceAll('blob/master', 'contents')}`;
  const res = await fetch(url);
  return await res.json();
}
