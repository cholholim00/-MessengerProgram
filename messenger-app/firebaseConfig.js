// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrEk38wKjxn19KFdJFUmIBPKhyyAD6-Hk',
  authDomain: 'messenger-app-6d9cd.firebaseapp.com',
  projectId: 'messenger-app-6d9cd',
  storageBucket: 'messenger-app-6d9cd.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // 🔥 Firestore 추가