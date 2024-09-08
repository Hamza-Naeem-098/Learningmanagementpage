// Firebase.js or Firebases.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCsA7ZSJ2rqB5seFW02cpyP_Kb_c2WTUVQ",
  authDomain: "softwarelearningmanagemenet.firebaseapp.com",
  projectId: "softwarelearningmanagemenet",
  storageBucket: "softwarelearningmanagemenet.appspot.com",
  messagingSenderId: "688236695436",
  appId: "1:688236695436:web:cb796ba8439e8dc564d0a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app);


export { auth, db, storage }; // Export auth and db
