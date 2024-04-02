// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-mern-estate-4632f.firebaseapp.com",
  projectId: "my-mern-estate-4632f",
  storageBucket: "my-mern-estate-4632f.appspot.com",
  messagingSenderId: "161451232517",
  appId: "1:161451232517:web:4096cc2b50ded2283fbb6c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);