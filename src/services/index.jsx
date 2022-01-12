import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
    apiKey: "AIzaSyAJX6A0gvmTtddH-lKAdzYPFogKm6dmgPE",
    authDomain: "library-online-3ec9d.firebaseapp.com",
    projectId: "library-online-3ec9d",
    storageBucket: "library-online-3ec9d.appspot.com",
    messagingSenderId: "168686532840",
    appId: "1:168686532840:web:d0670c29dfd3fd0328b15d",
    measurementId: "G-TMGPGGJBC7"
  };
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  
  export { storage, firebase as default };