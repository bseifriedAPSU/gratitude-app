//import firebase app for database initialization 
import { initializeApp } from "firebase/app";
//import firebase database for database usage
import { getDatabase } from 'firebase/database'
//import firebase authentication 
import { GoogleAuthProvider, getAuth} from "firebase/auth";

//Configure the firebase database
const firebaseConfig = {
    apiKey: "AIzaSyD22sZN5BsAKhr966RjHkz_jH1w0gtGiJg",
    authDomain: "database-test-626d7.firebaseapp.com",
    projectId: "database-test-626d7",
    storageBucket: "database-test-626d7.appspot.com",
    messagingSenderId: "521254194277",
    appId: "1:521254194277:web:4b1f24147456d8e1e3ca8c",
};

const app = initializeApp(firebaseConfig);//initialization of the firebase app 
export const auth = getAuth(app);//initialization of the firebase authentication
export const db = getDatabase(app);//initialize the firebase database
export const provider = new GoogleAuthProvider(app);