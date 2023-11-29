import { FirebaseOptions, initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries
const locationHostname = function (hostname: string): { isDev: boolean; hostname: string } {
  return { isDev: hostname === '127.0.0.1' || hostname === 'localhost', hostname: hostname };
};

const { isDev, hostname } = locationHostname(location.hostname);
console.log(import.meta.env.API_KEY);
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase

const fbApp = initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
export const firestore = getFirestore(fbApp);
export const fbStorage = getStorage(fbApp);

if (isDev) {
  console.log(`${hostname} detected!`);
  connectAuthEmulator(fbAuth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  connectStorageEmulator(fbStorage, '127.0.0.1', 9199);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = isDev ? null : getAnalytics(fbApp);
