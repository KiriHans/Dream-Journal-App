import { FirebaseOptions, initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries
const locationHostname = function (hostname: string): { isDev: boolean; hostname: string } {
  return { isDev: hostname === '127.0.0.1' || hostname === 'localhost', hostname: hostname };
};

const { isDev, hostname } = locationHostname(location.hostname);

const firebaseConfig: FirebaseOptions = isDev
  ? {
      apiKey: 'AIzaSyBadHKqQlE6PgNs1n7XJaVP9oRONpc4Z50',
      authDomain: 'demo-project-1234.firebaseapp.com',
      projectId: 'demo-project-1234',
      storageBucket: 'demo-project-1234.appspot.com',
      messagingSenderId: '46test',
      appId: '1:test',
      measurementId: 'G-test',
    }
  : {
      apiKey: 'AIzaSyBadHKqQlE6PgNs1n7XJaVP9oRONpc4Z50',
      authDomain: 'dream-journal-b5dda.firebaseapp.com',
      projectId: 'dream-journal-b5dda',
      storageBucket: 'dream-journal-b5dda.appspot.com',
      messagingSenderId: '460040744435',
      appId: '1:460040744435:web:4ad15a0186abd266333686',
      measurementId: 'G-JCZ5W1F68F',
    };

// Initialize Firebase

const fbApp = initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
export const firestore = getFirestore(fbApp);

if (isDev) {
  console.log(`${hostname} detected!`);
  connectAuthEmulator(fbAuth, 'http://127.0.0.1:9099');
  connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = isDev ? null : getAnalytics(fbApp);
