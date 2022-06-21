import { update, ref } from 'firebase/database';
import { database } from '../index';

// 'email'
// 'averageStats/cpm'
export async function dbUpdateUser(userId, field, val) {
  try {
    return await update(ref(database, `users/${userId}`), { [field]: val });
  } catch (e) {
    console.error(e);
  }
}
