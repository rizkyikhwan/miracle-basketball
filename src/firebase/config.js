import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBKrgzlsqsZKwm1Ry8eeDpbyO-FA6DSHAw",
    authDomain: "miracle-basketball.firebaseapp.com",
    projectId: "miracle-basketball",
    storageBucket: "miracle-basketball.appspot.com",
    messagingSenderId: "970118278316",
    appId: "1:970118278316:web:cf63682f46ec3d61164309"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const dbAuth = firebase.auth()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { db, dbAuth, timestamp }