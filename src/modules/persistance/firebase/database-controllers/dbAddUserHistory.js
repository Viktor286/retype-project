import {database} from "../index";
import {push, ref, set} from "firebase/database";

export async function dbAddUserHistory(githubId, sessionData = {}) {
  const historyListRef = ref(database, `users/${githubId}/history`);
  const newSessionRef = push(historyListRef);
  return set(newSessionRef, sessionData);
}
