// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEKEY,
  authDomain: "brgy-luna-management-system.firebaseapp.com",
  projectId: "brgy-luna-management-system",
  storageBucket: "brgy-luna-management-system.appspot.com",
  messagingSenderId: "723724516218",
  appId: "1:723724516218:web:2db5ea1815d86af908b4c3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);