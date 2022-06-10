import "./index.css";

export default function NoLicenseNotification() {
  return <section className="no-license-notification">
    <h2>The licence type of this resource is not supported or hasn't been found.</h2>
    <p>If you're owner of this file you should have access to it after you login with your github account.</p>
    <p>Please, consider to open your files to public under one of the open source license like <a
      href="https://opensource.org/licenses/MIT" target="_blank" rel="noreferrer">MIT</a>. Get more info at <a
      href="https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository"
      target="_blank" rel="noreferrer">licensing a repository.</a></p>
    <p><a href="/">Back to home page</a></p>
  </section>
}
