//import firebase app for database initialization 
import { initializeApp } from "firebase/app";
//import firebase database for database usage
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
//import firebase authentication 
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";

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
const db = getDatabase(app);//initialize the firebase database
const provider = new GoogleAuthProvider(app);
const user = undefined;

export function signIn() {
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
        .then((result) => {
            if (result.user) {
                const user = result.user;
                console.log(`user is signed in ${user.email}`);
                window.location = "/home";
            } else {
                alert(`no user signed in`);
            }
        }).catch((error) => {
            console.log(error);
        });
}

function databaseEmail() {
    var email = auth.currentUser.email;
    var index = email.indexOf('@');
    email = email.substring(0, index);
    var emailLocation = email.replace(/[^A-Z0-9]/ig, "");
    return emailLocation;
}

function time() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(now.getDate()).padStart(2, "0");
    const dayOfWeek = now.getDay();
    var hour = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = now.getSeconds();

    var day;
    var Month;

    switch (dayOfWeek) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            day = "Unknown Day";
    }

    switch (month) {
        case 1:
            Month = "January"
            break;
        case 2:
            Month = "February"
            break;
        case 3:
            Month = "March"
            break;
        case 4:
            Month = "April"
            break;
        case 5:
            Month = "May"
            break;
        case 6:
            Month = "June"
            break;
        case 7:
            Month = "July"
            break;
        case 8:
            Month = "August"
            break;
        case 9:
            Month = "September"
            break;
        case 10:
            Month = "October"
            break;
        case 11:
            Month = "November"
            break;
        case 12:
            Month = "December"
            break;
        default:
            Month = "unknown month"
    }

    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;

    return `${month}|${dayOfMonth}|${year}, ${hour}:${minutes} ${ampm}`
}

export function createNewEntry(headline, content, visibility) {
    var date = time();
    const userEmail = databaseEmail();
    set(ref(db, "users/" + userEmail + "/posts/ " + date), {
        Headline: headline,
        content: content,
        visibility: visibility
    })
        .then(() => {
            alert("Entry successfully created");
        })
        .catch((error) => {

        })
}


export function deleteJournalEntry(email, date) {
    remove(ref(db, "users/" + email + "/posts/" + date));
}

export function signOutOfAccount() {
    signOut(auth).then(() => {
        alert("Sign out successful");
        window.location = "/login";
        
    }).catch((error) => {
        alert("There was an error signing out");
    });
}

export function firebaseAuthentication() {
    signIn();
    
}
