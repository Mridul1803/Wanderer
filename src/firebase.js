import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

firebase.initializeApp(
    {
        apiKey: "AIzaSyBfStlsKx0m7pZ3EhfudDD80prIpja87Zk",
        authDomain: "reels-b7416.firebaseapp.com",
        projectId: "reels-b7416",
        storageBucket: "reels-b7416.appspot.com",
        messagingSenderId: "29398597271",
        appId: "1:29398597271:web:1827c87af9a87229e4b3d2"
    }
)

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    comments : firestore.collection('comments'),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();