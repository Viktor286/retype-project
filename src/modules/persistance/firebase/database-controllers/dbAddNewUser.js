import {database} from "../index";
import {ref, set} from "firebase/database";

export async function dbAddNewUser({
                              uid,
                              githubId,
                              email,
                              displayName,
                              userName,
                              photoURL,
                            }) {
  try {
    // no empty arrays on firebase
    const userData = {
      githubId,
      email,
      displayName,
      userName,
      photoURL,
      // history: [],
      averageStats: {
        cpm: 0,
        wpm: 0,
      },
      registered: new Date().getTime(),
    }

    const result = await set(ref(database, `users/${uid}`), userData);
    return result || undefined;
  } catch (e) {
    console.error(e);
  }
}
