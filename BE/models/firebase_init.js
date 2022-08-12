// firebase 연결
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

const firebaseConfig = {
  apiKey: "AIzaSyAfH73cmXqm0iybh04eb9XpdpSW0Os_cPM",
  authDomain: "codestates-opensea.firebaseapp.com",
  projectId: "codestates-opensea",
  storageBucket: "codestates-opensea.appspot.com",
  messagingSenderId: "111388969216",
  appId: "1:111388969216:web:6d4edfe536cb7175db8be5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const dbService = getFirestore(app);