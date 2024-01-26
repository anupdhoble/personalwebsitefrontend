// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDACOkDkLCZWX7n1s4P4COD224Sy_WIKQQ",
  authDomain: "fir-d0405.firebaseapp.com",
  projectId: "fir-d0405",
  storageBucket: "fir-d0405.appspot.com",
  messagingSenderId: "177750024741",
  appId: "1:177750024741:web:7179ca85ac16d0975715cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();