// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-mern-dd0e4.firebaseapp.com",
  projectId: "realestate-mern-dd0e4",
  storageBucket: "realestate-mern-dd0e4.appspot.com",
  messagingSenderId: "1058451677275",
  appId: "1:1058451677275:web:de21ff8daac311fd605f7e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
