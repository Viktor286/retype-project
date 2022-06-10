/* eslint-disable */
export {dbAddNewUser} from "./dbAddNewUser";
export {dbAddUserHistory} from "./dbAddUserHistory";
export {dbReadUser, dbReadUserField} from "./dbReadUser";
export {dbUpdateUser} from "./dbUpdateUser";
export {dbAddUserLogin, dbAddUserReturn, dbAddUserLastReturn} from "./dbUserVisits";

// todo: do we need to run tests?
// examples:
  // dbAddUserLogin(githubId, new Date().getTime());
  // dbAddUserReturn(githubId, new Date().getTime());
  //
  // dbUpdateUser(githubId, 'averageStats/wpm', 3);
  // dbUpdateUser(githubId, 'userName', 'tobasco');
  //
  // const history = await dbReadUserField(githubId, 'history');
  //
  // dbAddUserHistory(githubId, createHistorySessionStat(
  //   {elapsedSeconds: 1},
  //   {correctAmount: 1, mistakes: 1},
  //   'sample-url')
  // );
