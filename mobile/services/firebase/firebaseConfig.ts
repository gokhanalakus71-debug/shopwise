import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNCZFVhfzbY27lT_DMLRXTwZk0TfI7dg0",
  authDomain: "shopwise-6763c.firebaseapp.com",
  projectId: "shopwise-6763c",
  storageBucket: "shopwise-6763c.firebasestorage.app",
  messagingSenderId: "264305801598",
  appId: "1:264305801598:web:4ed42d442cd3e5ecb75b2f",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
