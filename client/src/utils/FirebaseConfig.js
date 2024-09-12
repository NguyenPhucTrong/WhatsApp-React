// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhzlfoSFjxwKYy86eV_8p8I_4R3QsFzJw",
  authDomain: "whatsapp-8d5ac.firebaseapp.com",
  projectId: "whatsapp-8d5ac",
  storageBucket: "whatsapp-8d5ac.appspot.com",
  messagingSenderId: "379181913408",
  appId: "1:379181913408:web:f92061c6ea6bd322d696a5",
  measurementId: "G-J7014E32L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);