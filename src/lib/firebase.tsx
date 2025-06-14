// lib/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Or getFirestore for Firestore

const firebaseConfig = {
  apiKey: "AIzaSyADUNxShkfgxRl-EdVlofr_emlZAxLPXhY",
  authDomain: "autogreenhouse-7.firebaseapp.com",
  projectId: "autogreenhouse-7",
  storageBucket: "autogreenhouse-7.appspot.com",
  messagingSenderId: "354376186112",
  appId: "1:354376186112:web:7880190c5217112b2c1be5",
  databaseURL : "https://autogreenhouse-7-default-rtdb.firebaseio.com"

};

// Prevent re-initialization in development
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app); // Or getFirestore(app) if you're using Firestore

export { auth, database };
