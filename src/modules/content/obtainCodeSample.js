import {fetchGithubResource} from "./fetchGithubResource";
import CreateCodeSample from "../../model/CodeSample";

export default async function obtainCodeSample(githubPath) {
  try {
    // todo make proper githubPath validation
    const githubResource = await fetchGithubResource(githubPath);
    const {content, name, html_url} = githubResource;

    const codeSample = await CreateCodeSample({
      fileName: name,
      content,
      html_url
    });

    window.codeTrainerApp.codeSample = codeSample; // todo: can we avoid this trick effectively?

    return codeSample;
  } catch (e) {
    console.error(e);
  }
}
