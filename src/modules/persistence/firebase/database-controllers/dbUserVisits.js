import { database } from '../index';
import { push, ref, set } from 'firebase/database';
import { dbUpdateUser } from './dbUpdateUser';

export async function dbAddUserLogin(githubId, timestamp) {
  const loginsListRef = ref(database, `users/${githubId}/visits/logins`);
  return set(push(loginsListRef), timestamp);
}

export async function dbAddUserReturn(githubId, timestamp) {
  const loginsReturns = ref(database, `users/${githubId}/visits/returns`);
  return set(push(loginsReturns), timestamp);
}

export async function dbAddUserLastReturn(githubId, timestamp) {
  return dbUpdateUser(githubId, 'visits/lastReturn', timestamp);
}
