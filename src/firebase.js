import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBW-ZWVcAHVwCnGixH69kZVA1ZCXFGW6Qs",
  authDomain: "todo-app-kr040902.firebaseapp.com",
  projectId: "todo-app-kr040902",
  storageBucket: "todo-app-kr040902.appspot.com",
  messagingSenderId: "1051925479026",
  appId: "1:1051925479026:web:e99d623e913968de7e8ceb",
  measurementId: "G-TL3G845X30",
});

const db = firebaseApp.firestore();

export default db;
