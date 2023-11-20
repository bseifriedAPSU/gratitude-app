import { auth, provider, db } from "./firebaseConfig";
import { signInWithRedirect, signOut } from 'firebase/auth';
import { ref, remove, onValue, set, update, get, query, orderByChild } from 'firebase/database';
import { Profiler } from "react";


//calls firebase google sign in function 
export function signIn() {
    signInWithRedirect(auth, provider);
}


//gets the location of the username in the database and returns the uid 
export async function getUsernameLocation(username) {
    return new Promise((resolve, reject) => {
        const dbRef = ref(db, 'users');

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                if (childData.Username === username) {
                    const userKey = childSnapshot.key;
                    resolve(userKey);
                }

            })
        })
    })
}

//gets the username from the user account in the database 
export function getUsername() {
    const dbRef = ref(db, 'users/' + auth.currentUser.uid);

    return new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
            const userData = snapshot.val();
            const username = userData.Username;
            localStorage.setItem('username', username);
            resolve(username);
        }, (error) => {
            reject(error);
        });
    });
}

//created function to retrieve user avatar image
export function getUserImage() {
    const dbRef = ref(db, 'users/' + auth.currentUser.uid);
    return new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
            const userData = snapshot.val();
            const userImage = userData.profilePicture;
            localStorage.setItem('userImage', userImage);
            resolve(userImage);
        }, (error) => {
            reject(error);
        });
    });
}

//gets the date from the input string 
export function entryDate(inputString) {

    var splitArray = inputString.split("Date:");

    var extractedText = splitArray[1].trim();

    return extractedText;
}

//gets the entry headline from the community input string 
export function getCommunityHeadline(inputString) {
    const match = inputString.match(/Headline: ([^|]+)\s*\|/);

    if (match && match[1]) {
        const extractedText = match[1].trim();
        return extractedText;
    }
}

//gets the entry headline from the hompepage input string 
export function entryHeadline(inputString) {
    var splitArray = inputString.split(/Headline:|[*]/);

    var extractedText = splitArray[1].trim();

    return extractedText;
}

//gets the username from the input string 
export function getUsernameFromString(inputString) {
    const match = inputString.match(/Username: ([^|]+)\s*\|/);

    if (match && match[1]) {
        const extractedText = match[1].trim();
        return extractedText;
    }
}

//signs the user of of their account 
export function signOutOfAccount() {
    signOut(auth).then(() => {
        window.location = "/";
        localStorage.clear();


    }).catch((error) => {
        alert("There was an error signing out");
    });
}

//creates the user account if it does not currently exist
export function createUserAccount(profile_pic, username, userID) {

    set(ref(db, 'users/' + userID), {
        Username: username,
        profilePicture: profile_pic,
        isAdmin: false
    });
}

//checks to see if the user account exist or not 
export function userAccountCheck(userID) {
    const dbRef = ref(db, 'users');

    return new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
            let accountExists = false;

            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.key === userID) {
                    accountExists = true;
                    return;
                }
            });

            resolve(accountExists);
        });
    });
}

//updates the user's profile picture if the account exist 
export function updateUserAccount(profilePic, userID) {
    const dbRef = ref(db, `users/${userID}`);
    const updates = {};
    updates[`profilePicture`] = profilePic;
    return update(dbRef, updates);
}

export function admin() {
    const userID = localStorage.getItem('uid');
    const dbRef = ref(db, `users/${userID}`);

    return get(dbRef).then((snapshot) => {
        const childData = snapshot.val();
        return childData.isAdmin;
    })
}

//deletes user account when they press the delete button 
export function deleteUserAccount() {
    const userID = localStorage.getItem('uid');
    const removeRef = ref(db, `users/${userID}`);
    remove(removeRef).then(() => {
        window.location.href = '/';
    })

}

export function adminAccountDelete(username) {
    const dbRef = ref(db, 'users');

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData.Username === username) {
                const removeRef = ref(db, `users/${childSnapshot.key}`);
                console.log(removeRef);
                return remove(removeRef).then(() => {
                    console.log("Account successfully deleted");
                }).catch((error) => {
                    console.log('Error reomoving account', error);
                });
            }
        });
    });
}

export function displayAccountUsernames() {
    const dbRef = ref(db, 'users');

    return get(dbRef).then((snapshot) => {
        const usernames = [];

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const Username = childData.Username;

            usernames.push(Username);
        });
        return usernames;
    });
}
