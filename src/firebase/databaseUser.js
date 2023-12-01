import { auth, provider, db } from "./firebaseConfig";
import { signInWithRedirect, signOut } from 'firebase/auth';
import { ref, remove, onValue, set, update, get, push } from 'firebase/database';
import { Children } from "react";

//calls firebase google sign in function 
export function signIn() {
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithRedirect(auth, provider);
}


//gets the location of the username in the database and returns the uid 
export async function getUsernameLocation(username) {
    return new Promise((resolve, reject) => {
        const dbRef = ref(db, 'users');

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                if (childData.Username.trim() === username.trim()) {
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
    const match = inputString.match(/Title: ([^|]+)\s*\|/);

    if (match && match[1]) {
        const extractedText = match[1].trim();
        return extractedText;
    }
}

//gets the entry headline from the hompepage input string 
export function entryHeadline(inputString) {
    const match = inputString.match(/Title: ([^|]+)\s*\|/);

    if (match && match[1]) {
        const extractedText = match[1].trim();
        return extractedText;
    }
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
        sessionStorage.clear();
    }).catch((error) => {
        alert("There was an error signing out");
    });
}

//creates the user account if it does not currently exist
export function createUserAccount(profile_pic, username, userID) {

    set(ref(db, 'users/' + userID), {
        Username: username.trim(),
        profilePicture: profile_pic,
        isAdmin: false
    });
    const usernamesRef = ref(db, 'usernames');
    push(usernamesRef, username.trim());
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
export async function deleteUserAccount() {
    try {
        const userID = localStorage.getItem('uid');
        const removeRef = ref(db, `users/${userID}`);
        const username = localStorage.getItem('Username').trim();

        // Wait for removeUsername to complete before proceeding
        await removeUsername(username);

        // After the username is removed, delete the user account
        await remove(removeRef);

        // Clear sessionStorage after successful deletion
        sessionStorage.clear();

        return "User account deleted successfully";
    } catch (error) {
        console.error('Error deleting user account:', error);
        throw error;
    }
}


//allows admins to delete an account from the admin settings menu in the user settings 
export function adminAccountDelete(username) {
    const dbRef = ref(db, 'users');

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData.Username === username) {
                removeUsername(username);
                const removeRef = ref(db, `users/${childSnapshot.key}`);
                console.log(removeRef);
                return remove(removeRef).then(() => {
                    console.log("Account successfully deleted");
                }).catch((error) => {
                    console.log('Error reomoving account', error);
                    removeUsername(username);
                });
            }
        });
    });
}

//displays the list of account usernames on the user settings page for the admin functions 
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

//checks to see if the username already exists in the database 
export function usernameCheck(username) {
    const dbRef = ref(db, 'usernames');

    return get(dbRef).then((snapshot) => {
        let exists = false;

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const storedUsername = childData;
            console.log("Username", username, "Stored Username", storedUsername)
            if (username.toLowerCase() === storedUsername.toLowerCase()) {
                exists = true;
            }
        });

        return exists;
    });
}

function removeUsername(username) {
    const dbRef = ref(db, 'usernames');

    return get(dbRef)
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const storedUsername = childSnapshot.val().trim();
                console.log(childSnapshot.val().trim());
                console.log(childSnapshot.key);
                console.log('Username', username.trim(), 'stored username', storedUsername);

                // Check if the current child node has the username you want to remove
                if (storedUsername === username.trim()) {
                    const usernameKey = childSnapshot.key;

                    // Remove the username from the 'usernames' node
                    const usernameRef = ref(db, `usernames/${usernameKey}`);
                    return remove(usernameRef);
                }
            });
        })
        .catch((error) => {
            console.error('Error removing username:', error);
            throw error;
        });
}

export function deleteEntriesFromCommunity(username){
    const dbRef = ref(db, 'community/posts');

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (username.trim() === childData.Username.trim()) {
                const childKey = childSnapshot.key;
                const removeRef = ref(db, `community/posts/${childKey}`);
                remove(removeRef)
                    .then(() => {
                        console.log('Data removed successfully.');
                    })
                    .catch((error) => {
                        console.error('Error removing data:', error);
                    });
            }
        })
    })
}