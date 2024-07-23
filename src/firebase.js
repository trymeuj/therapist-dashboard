// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
console.log("hello");
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBO_ie7IMB82HbFgT90Rz6JOz35iUVz55M",
    authDomain: "svar-v2-4f0f4.firebaseapp.com",
    databaseURL: "https://svar-v2-4f0f4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "svar-v2-4f0f4",
    storageBucket: "svar-v2-4f0f4.appspot.com",
    messagingSenderId: "628827446185",
    appId: "1:628827446185:web:951f546cf62d94092742b8",
    measurementId: "G-V50ECXEL5P"
  };
console.log("hello2")
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);
console.log("hello3")
export { db,auth };
