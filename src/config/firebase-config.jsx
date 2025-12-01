import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDB43vPGjL2s7O_y1km3L50qYQAwCul0m8",
  authDomain: "expense-tracker-7887b.firebaseapp.com",
  projectId: "expense-tracker-7887b",
  storageBucket: "expense-tracker-7887b.firebasestorage.app",
  messagingSenderId: "144364306222",
  appId: "1:144364306222:web:9f6c1ecacee02e0cc7c4bf",
  measurementId: "G-KFLBQ2KGDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

//firebase login
//firebase init
//firebase deploy