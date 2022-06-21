import { setPersistence, browserLocalPersistence, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

export const signInGithubWithPopup = async (auth) => {
  try {
    const provider = new GithubAuthProvider();
    await setPersistence(auth, browserLocalPersistence);
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    const result = await signInWithPopup(auth, provider);
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    // const credential = GithubAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    return result.user;
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    console.log('error', {
      error,
      errorCode,
      errorMessage,
      email,
      credential,
    });
  }
};
