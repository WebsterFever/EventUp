import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD_n2e0svxF4vZfZyV1QfLkFGqtZ28-61c',
  authDomain: 'exercice07.firebaseapp.com',
  projectId: 'exercice07',
  storageBucket: 'exercice07.firebasestorage.app',
  messagingSenderId: '976902619961',
  appId: '1:976902619961:web:1084dbbbb56794d9eedee8',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
