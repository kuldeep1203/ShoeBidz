// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJpbHhGmqxiLmrObzTkJSyOIzDu88hxXs",
  authDomain: "shoebidz.firebaseapp.com",
  projectId: "shoebidz",
  storageBucket: "shoebidz.appspot.com",
  messagingSenderId: "691882222705",
  appId: "1:691882222705:web:2792bdc384524b4fe927d0",
  measurementId: "G-XRT8LP2NXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);