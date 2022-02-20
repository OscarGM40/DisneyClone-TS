import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAkKgipf7eYOI4X8CZHefCjbPuY2BVlX1E",
  authDomain: "disneyplus-clone-76429.firebaseapp.com",
  projectId: "disneyplus-clone-76429",
  storageBucket: "disneyplus-clone-76429.appspot.com",
  messagingSenderId: "546445721988",
  appId: "1:546445721988:web:3ad8109b705d42da8c9dd1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }