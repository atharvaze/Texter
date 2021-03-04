// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDIH8WaBI3J8NKlMW2ljM1iYE9FUlh1W0M",
    authDomain: "talkie-bcb94.firebaseapp.com",
    projectId: "talkie-bcb94",
    storageBucket: "talkie-bcb94.appspot.com",
    messagingSenderId: "722285643866",
    appId: "1:722285643866:web:05ec0f4c9af1a13a51b063",
    measurementId: "G-Z12FY8RM3G"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig)
  const db = firebaseapp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()


export {auth,provider}
export default db