// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChv-fJl1iOBeswG_pr8tw_-jPjFire64o",
  authDomain: "campers-shop.firebaseapp.com",
  projectId: "campers-shop",
  storageBucket: "campers-shop.firebasestorage.app",
  messagingSenderId: "274522004978",
  appId: "1:274522004978:web:102334d7b5641b28a11f6b"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app)
