import { child, get, ref } from 'firebase/database';
import { database } from '../index';

const dbRef = ref(database);

export async function dbReadUser(userId) {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    return snapshot?.val?.();
  } catch (e) {
    console.error(e);
  }
}

export async function dbReadUserField(userId, field) {
  try {
    const snapshot = await get(child(dbRef, `users/${userId}/${field}`));
    return snapshot?.val?.();
  } catch (e) {
    console.error(e);
  }
}

// email
// displayName
// userName
// photoURL
// history
// averageStats
