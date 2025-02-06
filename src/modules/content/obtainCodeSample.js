import { fetchGithubResource, obtainCredentials } from './github';
import CreateCodeSample from '../../model/CodeSample';

export default async function obtainCodeSample(githubPath, userName) {
  try {
    const githubResource = await fetchGithubResource(githubPath);
    console.log('@@ githubResource', JSON.stringify(githubResource));
    const { content, name, html_url, url, message } = githubResource;

    // console.log('FROM GH', { content, name, html_url, url, message });

    if (message === 'Not Found') {
      return 'Resource was not found';
    }

    const credentials = await obtainCredentials(url, userName);

    const codeSample = await CreateCodeSample({
      fileName: decodeURI(name),
      content,
      html_url: decodeURI(html_url),
      credentials,
    });

    window.codeTrainerApp.codeSample = codeSample; // todo: can we avoid this trick effectively?

    return codeSample;
  } catch (e) {
    console.error(e);
  }
}
