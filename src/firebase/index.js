import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAW0EBOdwjVmPaw3m38fb_yCAajl10l-KI",
  authDomain: "to-do-list-5cae5.firebaseapp.com",
  projectId: "to-do-list-5cae5",
  storageBucket: "to-do-list-5cae5.appspot.com",
  messagingSenderId: "242180538414",
  appId: "1:242180538414:web:4eed7d0f34b0c82ad49fbf"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db
}