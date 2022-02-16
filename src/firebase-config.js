// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBAOq6pjmI1U_JW2XmJjHJkYflWwA8E58",
  authDomain: "picture-uploader-b6749.firebaseapp.com",
  projectId: "picture-uploader-b6749",
  storageBucket: "picture-uploader-b6749.appspot.com",
  messagingSenderId: "924309645785",
  appId: "1:924309645785:web:97dee7dfae1689ab2b91c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//
export const db = getFirestore(app);
export const storage = getStorage(app);
//
export const timestamp = serverTimestamp;
