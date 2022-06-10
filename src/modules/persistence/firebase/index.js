import {initializeApp} from "firebase/app";
import {firebaseConfig} from './firebaseConfig';
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

// Init
const app = initializeApp(firebaseConfig);

// Realtime Database
const database = getDatabase(app);

// Other services
getAnalytics(app);
getPerformance(app);

const prepareAuth = () => {
  return new Promise((resolve, reject) => {
    try {
      const auth = getAuth();
      auth.onAuthStateChanged(authData => {
        if (authData === null) {
          resolve({auth});
        } else {
          resolve({authData, auth});
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

export {database, prepareAuth};
