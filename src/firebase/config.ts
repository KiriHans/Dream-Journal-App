import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = getAuth(fbApp);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(fbApp);
