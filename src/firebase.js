import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//GET Below Settings from Firebase > Project Overview > Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: "AIzaSyDFHrTHY9PTPlhOVzvIksYwK9rr4EN6N-Q",
  authDomain: "whatsapp-clone-1d69b.firebaseapp.com",
  projectId: "whatsapp-clone-1d69b",
  storageBucket: "whatsapp-clone-1d69b.appspot.com",
  messagingSenderId: "1015522554165",
  appId: "1:1015522554165:web:d144541838a8f62348dc7c"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
