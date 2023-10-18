//import firebase app for database initialization 
import { initializeApp } from "firebase/app";
//import firebase database for database usage
import { getDatabase, ref, set, remove } from "firebase/database";
//import firebase authentication 
import { GoogleAuthProvider, getAuth, signInWithRedirect, signInWithCredential, getRedirectResult } from "firebase/auth";

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
const auth = getAuth(app);//initialization of the firebase authentication
const database = getDatabase(app);//initialize the firebase database
const provider = new GoogleAuthProvider(app);

function redirectResult() {
    signInWithRedirect(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            const email = user.email;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

function handleCredentialResponse(response) {
    // Build Firebase credential with the Google ID token.
    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);

    // Sign in with credential from the Google user.
    signInWithCredential(auth, credential).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The credential that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

export function firebaseAuthentication() {
    signIn(redirectResult);
}
