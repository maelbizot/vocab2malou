import { initializeApp } from "firebase/app"
import  { getFirestore } from 'firebase/firestore'

import exp from "constants"

const firebaseConfig = {
  apiKey: "AIzaSyAMrFnRJ7aos2N5alsRF746zH1wh7fxtSY",
  authDomain: "vocab-malou-e8b5b.firebaseapp.com",
  databaseURL: "https://vocab-malou-e8b5b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vocab-malou-e8b5b",
  storageBucket: "vocab-malou-e8b5b.appspot.com",
  messagingSenderId: "848743323879",
  appId: "1:848743323879:web:5c56c93ab046b5e3d86a42",
  measurementId: "G-R7CKGR6DH8"
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const db = getFirestore(app)

export {
    db
}