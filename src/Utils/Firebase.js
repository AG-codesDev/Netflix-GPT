// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3UwsYYDB6M-7edNOuPiY6UlBZMdjCwwg",
  authDomain: "netflix-gpt-d861a.firebaseapp.com",
  projectId: "netflix-gpt-d861a",
  storageBucket: "netflix-gpt-d861a.appspot.com",
  messagingSenderId: "758696583927",
  appId: "1:758696583927:web:6080cfbbda4cd9956729f2",
  measurementId: "G-05YB952290",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
