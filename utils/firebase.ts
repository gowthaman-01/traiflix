
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS_Z-ie5cp6F0jDasZZRxNU2v03CD74mQ",
  authDomain: "traiflix.firebaseapp.com",
  projectId: "traiflix",
  storageBucket: "traiflix.appspot.com",
  messagingSenderId: "422550482506",
  appId: "1:422550482506:web:ca241191b0380524a800b3",
  measurementId: "G-VL66KN5MXC"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }