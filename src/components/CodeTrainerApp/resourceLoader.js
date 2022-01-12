import {fetchGithubResource} from "../../modules/content/fetchGithubResource";
import CreateCodeSample from "../../model/CodeSample";
// import {setCodeSample} from "../../model/redux/sample";

export default async function resourceLoader({githubPathname}) {
  if (githubPathname > 3) {
    fetchGithubResource(githubPathname).then(async githubResource => {
      const {content, name, html_url} = githubResource;

      if (!content || !name) {
        return;
      }

      const codeSample = await CreateCodeSample({
        fileName: name,
        content,
        html_url
      });

      window.codeTrainerApp.codeSample = codeSample; // todo: can we avoid this trick effectively?
      // dispatch(setCodeSample(codeSample));
    });
  }
}
