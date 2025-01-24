// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNVgxFlfzjNniDeOWfNGtixO2pQncLm74",
  authDomain: "sign-up-60cb6.firebaseapp.com",
  databaseURL: "https://sign-up-60cb6-default-rtdb.firebaseio.com",
  projectId: "sign-up-60cb6",
  storageBucket: "sign-up-60cb6.firebasestorage.app",
  messagingSenderId: "687730009137",
  appId: "1:687730009137:web:193c94ed0735b34fbc2110",
  measurementId: "G-ME1CNCRT16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const database = getDatabase(app);