// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getDatabase, ref, set, push, onValue} from 'firebase/database';
import { initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9nrgTIfxbfnTbW7XhjS5q-0ghn4-N-dQ",
  authDomain: "emprestimos-ufrn.firebaseapp.com",
  databaseURL: "https://emprestimos-ufrn-default-rtdb.firebaseio.com",
  projectId: "emprestimos-ufrn",
  storageBucket: "emprestimos-ufrn.appspot.com",
  messagingSenderId: "615663884758",
  appId: "1:615663884758:web:787cf185d744ceeeae6c77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {database, ref, set, push, onValue, auth};