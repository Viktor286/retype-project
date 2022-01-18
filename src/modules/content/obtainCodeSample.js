import { fetchGithubResource, obtainCredentials } from "./github";
import CreateCodeSample from "../../model/CodeSample";

export default async function obtainCodeSample(githubPath, userName) {
  try {
    const githubResource = await fetchGithubResource(githubPath);
    const {content, name, html_url, url} = githubResource;
    const credentials = await obtainCredentials(url, userName);

    const codeSample = await CreateCodeSample({
      fileName: decodeURI(name),
      content,
      html_url: decodeURI(html_url),
      credentials
    });

    window.codeTrainerApp.codeSample = codeSample; // todo: can we avoid this trick effectively?

    return codeSample;
  } catch (e) {
    console.error(e);
  }
}
