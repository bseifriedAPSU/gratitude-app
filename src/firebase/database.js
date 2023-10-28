import { auth, provider, db } from "./firebaseConfig";
import { signInWithRedirect, signOut } from 'firebase/auth';
import { push, ref, query, limitToLast, remove, onValue, equalTo, endBefore, startAt, endAt } from 'firebase/database';


const user = undefined;

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
    Month = Month.padStart(2, "0");

    return `${day}, ${Month} ${dayOfMonth}, ${year}, ${hour}:${minutes} ${ampm}`
}

export function createNewEntry(headline, content, visibility) {
    var date = time();
    const userId = auth.currentUser.uid;
    const newPost = push(ref(db, "users/" + userId + "/posts"), {
        date: date,
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

export function homepageJournalList(userId) {
        var data = [];
        const dbRef = query(ref(db, 'users/' + userId + '/posts'), limitToLast(5));
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();

                if (childData && childData.Headline && childData.date) {
                    const { Headline, date } = childData;
                    data.push("Testing the Headline " + Headline + "   *****   Testing the date " + date);
                }
            })
        })
        return data;
    
}

export function deleteJournalEntry(email, date) {
    remove(ref(db, "users/" + email + "/posts/" + date));
}

export function signOutOfAccount() {
    signOut(auth).then(() => {
        alert("Sign out successful");
        window.location = "/";
        
    }).catch((error) => {
        alert("There was an error signing out");
    });
}

export function firebaseAuthentication() {
    signIn();
    
}
