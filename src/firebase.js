// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKGPoYBdRplFMA4R83ieuIUAqOQLbc_5E",
  authDomain: "sigema-s-de-gestion-medica.firebaseapp.com",
  projectId: "sigema-s-de-gestion-medica",
  storageBucket: "sigema-s-de-gestion-medica.appspot.com",
  messagingSenderId: "612144463544",
  appId: "1:612144463544:web:6c947b54aa3bc101d0fe4d",
  measurementId: "G-GSPP5NNKDC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);