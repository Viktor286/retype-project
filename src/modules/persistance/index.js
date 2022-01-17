import {dbReadUserField, dbAddNewUser, dbAddUserHistory} from "./firebase/database-controllers";

export async function initializeUserByAuthData(githubAuthData, auth) {
  if (!githubAuthData) {
    return {auth};
  }

  const {providerData, email, displayName, photoURL, reloadUserInfo, uid} = githubAuthData;
  const githubId = providerData[0].uid;
  const {screenName: userName} = reloadUserInfo;

  // Initialize user with database, check via averageStats
  let averageStats = await dbReadUserField(uid, 'averageStats');

  if (!averageStats) {
    await dbAddNewUser({githubId, email, displayName, userName, photoURL, uid});
    averageStats = {
      cpm: 0,
      wpm: 0,
    };
  }

  return {
    uid,
    githubId,
    displayName,
    userName,
    photoURL,
    averageStats,
    auth
  };
}

export async function sendHistoryInfo(githubId, historySessionStat) {
  return dbAddUserHistory(githubId, historySessionStat);
}
