import { db } from "./firebaseConfig";
import { onValue, ref, query } from 'firebase/database';

//displays the content for the specific community entry when the user clicks the link 
export function displayCommunityEntryContent(headline, date) {
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

//creates the list of community entries when the user navigates to the community page 
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