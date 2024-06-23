import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZglQyp3gsq7STv-VeBN9ipN5_TB71Wvc",
  authDomain: "spacebox-demo-1dba5.firebaseapp.com",
  projectId: "spacebox-demo-1dba5",
  storageBucket: "spacebox-demo-1dba5.appspot.com",
  messagingSenderId: "891526034599",
  appId: "1:891526034599:web:f6e49f561dcd892c005782",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
