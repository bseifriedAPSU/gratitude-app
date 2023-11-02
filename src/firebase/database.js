import { auth, provider, db } from "./firebaseConfig";
import { signInWithRedirect, signOut } from 'firebase/auth';
import { push, ref, query, limitToLast, onValue, set, get, child} from 'firebase/database';

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

function getUserReferenceLocation(username) {
    const userRef = ref(db, 'users')

    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((userSnapshot) => {
                const userData = userSnapshot.val();
                if (userData && userData.Username === username) {
                    const userKey = userSnapshot.key;
                    return userKey;
                }
            })
        } else {
            console.log("username not found");
        }
    })  
}

function displayCommunityEntry(username, date){
    const userLocation = getUserReferenceLocation(username);
    const dbRef = ref(db, 'users/' + userLocation + '/posts');

    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (childData && childData.date === date) {
                const { content } = childData;
                return content;
            }
        })
    })
}

export function createNewEntry(headline, content, visibility) {
    var date = time();
    const userId = auth.currentUser.uid;
    
    push(ref(db, "users/" + userId + "/posts"), {
        date: date,
        Headline: headline,
        content: content,
        visibility: visibility
    })
        .then(() => {
            alert("Entry successfully created");
            if (visibility === true) {
                push(ref(db, 'community/posts'), {
                    date: date,
                    Headline: headline
                });
            }
        })
        .catch((error) => {

        })
}

export function homepageJournalList(userId) {
    return new Promise((resolve, reject) => {
        const data = [];
        const dbRef = query(ref(db, 'users/' + userId + '/posts'), limitToLast(5));

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

export function entryHeadline(inputString) {
    var splitArray = inputString.split(/Headline:|[*]/);

    var extractedText = splitArray[1].trim();

    return extractedText;
}

export function communityPageDisplay() {
    return new Promise((resolve, reject) => {

        var posts = [];
        const dbRef = query(ref(db, 'community/posts'), limitToLast(5));

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();

                const { Headline, date } = childData;
                posts.push("Headline: " + Headline + " | Username: Jscott72 | Date: " + date);
            });
            resolve(posts);
        }, (error) => {
            reject(error);
        });
    });
};

export function deleteJournalEntry() {
}

export function signOutOfAccount() {
    signOut(auth).then(() => {
        alert("Sign out successful");
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
                
                console.log(childSnapshot.key, "|||",userID);
                if (childSnapshot.key === userID) {
                    accountExists = true;
                    return; 
                }
            });

            resolve(accountExists);
        });
    });
}


export function getUserEntryContent(headline, date) {
    return new Promise((resolve, reject) => {
        const dbRef = ref(db, 'users/' + auth.currentUser.uid + "/posts");
        var content;

        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                console.log(childData.date);
                console.log(date);
                if (childData.Headline === headline && childData.date === date) {
                    content = childData.content;
                    console.log(content);
                }
            });
            resolve(content);
        }, (error) => {
            reject(error);
        });
    });
}