// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV4aJdfK73zd1EdhnLeGyJAc3f5z8aCes",
  authDomain: "email-summary-69414.firebaseapp.com",
  projectId: "email-summary-69414",
  storageBucket: "email-summary-69414.firebasestorage.app",
  messagingSenderId: "88138015277",
  appId: "1:88138015277:web:1bcc7f2f57b691119a0ea4",
  measurementId: "G-KD1K5GZHMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth};
