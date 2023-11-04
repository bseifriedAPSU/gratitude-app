import { auth, provider, db } from "./firebaseConfig";
import { signInWithRedirect, signOut } from 'firebase/auth';
import { push, ref, query, limitToLast, onValue, set, get, equalTo, orderByChild } from 'firebase/database';

export function signIn() {
    signInWithRedirect(auth, provider);

}

function time() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const dayOfMonth = String(now.getDate()).padStart(2, "0");
    const dayOfWeek = now.getDay();
    var hour = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");

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
    Month = Month.padStart(2, "0");

    return `${day}, ${Month} ${dayOfMonth}, ${year}, ${hour}:${minutes} ${ampm}`
}


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

export function displayCommunityEntry(headline, date) {
    return new Promise((resolve, reject) => {
        const userLocation = localStorage.getItem('RefLocation');
        const dbRef = ref(db, 'users/' + userLocation + '/posts');
        var content;

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();

                if (childData.Headline === headline && childData.date === date) {
                    content = childData.content;
                }
            })
            resolve(content);
        }, (error) => {
            reject(error);
        });
    });
}


export function getUsername() {
    const dbRef = ref(db, 'users/' + auth.currentUser.uid);

    return new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
            const userData = snapshot.val();
            const username = userData.Username;

            resolve(username);
        }, (error) => {
            reject(error);
        });
    });
}



export function createNewEntry(headline, content, visibility) {
    var date = time();
    const userId = auth.currentUser.uid;

    const username = localStorage.getItem('Username');

    push(ref(db, "users/" + userId + "/posts"), {
        date: date,
        Headline: headline,
        content: content,
        visibility: visibility
    })
        .then(() => {
            if (visibility === true) {
                push(ref(db, 'community/posts'), {
                    date: date,
                    Headline: headline,
                    Username: username
                });
            }
        })
        .catch((error) => {

        })
}

export function homepageJournalList(userId) {
    return new Promise((resolve, reject) => {
        const data = [];
        const dbRef = ref(db, 'users/' + userId + '/posts');

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();

                if (childData && childData.Headline && childData.date) {
                    var { Headline, date } = childData;
                    Headline.trim();
                    date.trim();
                    var inputString = "Headline: " + Headline + "   *****   Date: " + date;
                    data.push(inputString);
                }
            });
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}

export function entryDate(inputString) {

    var splitArray = inputString.split("Date:");

    var extractedText = splitArray[1].trim();

    return extractedText;
}
export function getCommunityHeadline(inputString) {
    const match = inputString.match(/Headline: ([^|]+)\s*\|/);

    if (match && match[1]) {
        const extractedText = match[1].trim();
        return extractedText;
    }
}

export function entryHeadline(inputString) {
    var splitArray = inputString.split(/Headline:|[*]/);

    var extractedText = splitArray[1].trim();

    return extractedText;
}

export function getUsernameFromString(inputString) {
    const match = inputString.match(/Username: ([^|]+)\s*\|/);

    if (match && match[1]) {
        const extractedText = match[1].trim();
        return extractedText;
    }
}

export function communityPageDisplay() {
    return new Promise((resolve, reject) => {

        var posts = [];
        const dbRef = query(ref(db, 'community/posts'));

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();

                const { Headline, date, Username } = childData;
                posts.push("Headline: " + Headline + " | Username: " + Username + " | Date: " + date);
            });
            resolve(posts);
        }, (error) => {
            reject(error);
        });
    });
};

export function deleteJournalEntry(headline, date) {

}

export function signOutOfAccount() {
    signOut(auth).then(() => {
        //localStorage.clear();
        window.location = "/";

    }).catch((error) => {
        alert("There was an error signing out");
    });
}

export function createUserAccount(profile_pic, username, userID) {

    set(ref(db, 'users/' + userID), {
        Username: username,
        profilePicture: profile_pic
    });
}

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

export function updateUserAccount() { }

export function getUserEntryContent(headline, date) {
    return new Promise((resolve, reject) => {
        const dbRef = ref(db, 'users/' + auth.currentUser.uid + "/posts");
        var content;

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                if (childData.Headline === headline && childData.date === date) {
                    content = childData.content;
                }
            });
            resolve(content);
        }, (error) => {
            reject(error);
        });
    });
}


export function wordCloudList(userId) {
    return new Promise((resolve, reject) => {
        const data = [];
        const dbRef = query(ref(db, 'users/' + userId + '/posts'));

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();

                if (childData && childData.Headline && childData.content) {
                    var { Headline, content } = childData;
                    Headline.trim();
                    content.trim();
                    var inputString = "Headline: " + Headline + "   *****   content: " + content;
                    data.push(inputString);
                }
            });
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}