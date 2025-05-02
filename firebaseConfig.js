// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import axios from "axios";
import qs from "qs";

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
const auth = getAuth(app);

export {auth};





const callProxyToIBM = async () => {
  const IBM_API_KEY = "6Zdjf_EuSukdgjcinncuhe_coEAaJ5nL2z4pCHm6NuQ7";
  const data = qs.stringify({
          grant_type: "urn:ibm:params:oauth:grant-type:apikey",
          apikey: IBM_API_KEY,
        });
      
  try {
    const response = await axios.post(
      "https://us-central1-email-summary-69414.cloudfunctions.net/proxyToIBM",data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response from Firebase Function:", response.data);
  } catch (error) {
    console.error("Error calling Firebase Function:", error.message);
  }
};

export default callProxyToIBM;