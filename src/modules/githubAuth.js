import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

export const signInGithubWithPopup = async () => {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      // const credential = GithubAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      console.log('result', result);
      // The signed-in user info.
      const user = result.user;
      console.log('user', user);
    }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    console.log('error', error);
  });

}
