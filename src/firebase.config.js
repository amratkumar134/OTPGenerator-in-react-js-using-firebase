// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAR7Q_Pz0YftlZd9BBRQCwDK2Nhz4eABGU",
  authDomain: "otp-project-6b1eb.firebaseapp.com",
  projectId: "otp-project-6b1eb",
  storageBucket: "otp-project-6b1eb.appspot.com",
  messagingSenderId: "802132553820",
  appId: "1:802132553820:web:96863abbd94df8f6cc3699",
  measurementId: "G-2W217SLX10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);