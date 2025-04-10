// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt7PKhKc6fkZg-vDBqtWL_jWmiQ0l2OnU",
  authDomain: "cro102-80d3e.firebaseapp.com",
  projectId: "cro102-80d3e",
  storageBucket: "cro102-80d3e.firebasestorage.app",
  messagingSenderId: "244332523472",
  appId: "1:244332523472:web:82fce7b6f7a0fafdddd3d5",
  measurementId: "G-YYZKE6N7KV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);