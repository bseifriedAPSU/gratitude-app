import { db } from "./firebaseConfig";
import { onValue, ref, query, orderByChild, remove, get } from 'firebase/database';

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

export function searchCommunityJournalEntry(inputString) {
    const userPostsRef = ref(db, `community/posts`);

    const lowercaseInputString = inputString.toLowerCase();
    const searchQuery = query(
        userPostsRef,
        orderByChild('Headline'),
    );

    return get(searchQuery).then((snapshot) => {
        const searchResults = [];

        if (snapshot.exists()) {
            snapshot.forEach((postSnapshot) => {
                const post = postSnapshot.val();
                const headline = post.Headline;

                const lowercaseHeadline = headline.toLowerCase();

                if (lowercaseHeadline.includes(lowercaseInputString)) {
                    const resultString = "Headline: " + headline + " | Username: " + post.Username + " | Date: " + post.date;
                    searchResults.push(resultString);
                }
            });
        }

        return searchResults;
    }).catch((error) => {
        console.error('Error getting data:', error);
        throw error;
    });
}

export function userAccountCommunityDelete(username) {
    const dbRef = ref(db, 'community/posts');

    return get(dbRef).then((snapshot) => {
        const deletePromises = [];

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            const communityUsername = childData.Username;

            if (username === communityUsername) {
                const removeRef = ref(db, `community/posts/${childSnapshot.key}`);
                const deletePromise = remove(removeRef);
                deletePromises.push(deletePromise);
            }
        });

        return Promise.all(deletePromises);
    });
}