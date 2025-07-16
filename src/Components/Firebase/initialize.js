import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAtG0XHGqT9O5pZz10grukgBiKNc5QjQAU",
  authDomain: "expensetracker-a08e8.firebaseapp.com",
  projectId: "expensetracker-a08e8",
  storageBucket: "expensetracker-a08e8.firebasestorage.app",
  messagingSenderId: "271285738553",
  appId: "1:271285738553:web:2fdffc634da7424150c1e8",
  measurementId: "G-R50X0NGMDB",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);

export const auth = getAuth(firebaseApp);
export default firebaseApp;
