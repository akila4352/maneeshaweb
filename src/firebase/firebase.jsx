// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEriXTkuQrt-Mp3l7pxYQ37f1I54vpVSg",
  authDomain: "maneesha-50b9e.firebaseapp.com",
  databaseURL: "https://maneesha-50b9e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "maneesha-50b9e",
  storageBucket: "maneesha-50b9e.firebasestorage.app",
  messagingSenderId: "926907779071",
  appId: "1:926907779771:web:818bc9c4c25b21b37c49ca",
  measurementId: "G-PMEMC8TM57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const rtdb = getDatabase(app);

export { app, analytics, rtdb };