import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBXP66PRjUTMS3uBd8GoWz2bMwCrGs0zaw",
  authDomain: "flexappgoog.firebaseapp.com",
  projectId: "flexappgoog",
  storageBucket: "flexappgoog.appspot.com",
  messagingSenderId: "698025432333",
  appId: "1:698025432333:web:8f839f7b5946f4b7db4c44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)



// IOS = 438953293671-6tk1t643d8rt7k94esjlqa17frvpgu07.apps.googleusercontent.com
// ANDROID = 438953293671-duq37dgfavl1nr4ki625er00epee4h4k.apps.googleusercontent.com