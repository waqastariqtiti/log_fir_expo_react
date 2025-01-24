// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Your Firebase configuration (replace with your own Firebase credentials)
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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app)

export { storage, database, ref, set,auth };
