
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJGLB-BjsfugcYrpjcwULLyh0Ramt0TrU",
  authDomain: "chat-app-7d964.firebaseapp.com",
  projectId: "chat-app-7d964",
  storageBucket: "chat-app-7d964.appspot.com",
  messagingSenderId: "1056629721745",
  appId: "1:1056629721745:web:1f921811172956edb30d30",
  measurementId: "G-H4HNQZWK4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const dataBase = getFirestore(app)