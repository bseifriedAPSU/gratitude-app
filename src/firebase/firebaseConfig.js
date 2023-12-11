//import firebase app for database initialization 
import { initializeApp } from "firebase/app";
//import firebase database for database usage
import { getDatabase } from 'firebase/database'
//import firebase authentication 
import { GoogleAuthProvider, getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

//Configure the firebase database
const firebaseConfig = {
    apiKey: "AIzaSyBiRvDRU-MPPPifHa4itS3GUS4f2t87wQ8",
    authDomain: "gratitude-ab7a0.firebaseapp.com",
    projectId: "gratitude-ab7a0",
    storageBucket: "gratitude-ab7a0.appspot.com",
    messagingSenderId: "235956396078",
    appId: "1:235956396078:web:01ca8b1c2f8a864208ffbf"
};

const app = initializeApp(firebaseConfig);//initialization of the firebase app 
export const auth = getAuth(app);//initialization of the firebase authentication

//sets the browser persistence to session to only keep the users information during the current session 
setPersistence(auth, browserSessionPersistence).then(() => {
    console.log("Successfully set browser persistence");
}).catch((error) => {
    console.log("Error setting persistence", error);
});

export const db = getDatabase(app);//initialize the firebase database
export const provider = new GoogleAuthProvider(app);//initialize the google auth provider for the google login