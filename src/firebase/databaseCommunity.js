import { db } from "./firebaseConfig";
import { onValue, ref, query, orderByChild, get, update, set } from 'firebase/database';

//displays the content for the specific community entry when the user clicks the link 
export function displayCommunityEntryContent(headline, date) {
 
        const userLocation = localStorage.getItem('RefLocation');
        const dbRef = ref(db, 'users/' + userLocation + '/posts');
        var content = "No Content";
    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (childData && childData.Headline && childData.date && headline && date) {
                if (childData.Headline.trim() === headline.trim() && childData.date.trim() === date.trim()) {
                    content = childData.content;
                }
            }
        });
        return content;
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
                posts.push("Title: " + Headline + " | Username: " + Username + " | Date: " + date);
            });
            resolve(posts);
        }, (error) => {
            reject(error);
        });
    });
};

//searches for any entries or usernames that match the search input
export function searchCommunityJournalEntry(inputString) {
    const userPostsRef = ref(db, 'community/posts');

    const lowercaseInputString = inputString.toLowerCase().trim();
    const stringWithoutExtraSpaces = lowercaseInputString.replace(/\s+/g, ' ');
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
                const username = post.Username;

                const lowercaseHeadline = headline.toLowerCase();
                const lowercaseUsername = username.toLowerCase();

                if (lowercaseHeadline.includes(stringWithoutExtraSpaces) || lowercaseUsername.includes(stringWithoutExtraSpaces)) {
                    const resultString = "Title: " + headline + " | Username: " + username + " | Date: " + post.date;
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

//increases the number of flags on the selected entry by one 
export function increaseFlagCounter(headline, date, username) {
    const dbRef = ref(db, 'community/posts');

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (
                childData.Headline.trim() === headline.trim() &&
                childData.Username.trim() === username.trim() &&
                childData.date.trim() === date.trim()
            ) {
                const updatedFlagCount = childData.flagCount + 1;

                const updates = {};
                updates[`/community/posts/${childSnapshot.key}/flagCount`] = updatedFlagCount;
                return update(ref(db), updates);
            }
        });
    });
}

//gets the number of flags for the specific post 
export function getFlagCount(headline, date, username) {
    const dbRef = ref(db, 'community/posts');
    var flagCount = 0;
    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (
                childData.Headline.trim() === headline.trim() &&
                childData.Username.trim() === username.trim() &&
                childData.date.trim() === date.trim()
            ) {
                flagCount = childData.flagCount;
            }
        })
        return flagCount;
    })
}

//gets a list of all users who have flagged the post 
export function flaggedUserList(headline, date, username) {
    const dbRef = ref(db, 'community/posts');

    let postFound = false; // Variable to track if the post was found

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            if (
                childData.Headline.trim() === headline.trim() &&
                childData.Username.trim() === username.trim() &&
                childData.date.trim() === date.trim()
            ) {
                postFound = true; // Set the variable to true
                const postKey = encodeURIComponent(childSnapshot.key);

                // Check if excludedUsers exists
                const excludedUsersExists = 'excludedUsers' in childData && childData.excludedUsers !== null;

                // Update or set excludedUsers based on its existence
                if (excludedUsersExists) {
                    const updatedExcludedUsers = childData.excludedUsers || [];
                    updatedExcludedUsers.push(localStorage.getItem('Username'));

                    const updates = {
                        [`community/posts/${postKey}/excludedUsers`]: updatedExcludedUsers,
                    };

                    return update(ref(db), updates);
                } else {
                    const newExcludedUsers = [localStorage.getItem('Username')];
                    return set(ref(db, `community/posts/${postKey}/excludedUsers`), newExcludedUsers);
                }
            }
        });

        // After the loop, check if the post was found
        if (!postFound) {
            // Handle the case when the post is not found
            return Promise.reject(new Error('Post not found'));
        }

        return Promise.resolve();
    });
}

//checks to see if the user is currently on the exclusion list 
export function checkExclusionList(headline, date, username) {
    const dbRef = ref(db, 'community/posts');
    var userExcluded = false;
    const currentUser = localStorage.getItem('Username');

    return get(dbRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            if (
                childData.Headline.trim() === headline.trim() &&
                childData.Username.trim() === username.trim() &&
                childData.date.trim() === date.trim()
            ) {
                const excludedUsers = childData.excludedUsers || [];
                const isUserExcluded = excludedUsers.includes(currentUser);

                if (isUserExcluded) {
                    userExcluded = true;
                } 
            }
        });
        return userExcluded;
    });
}

//creates the listing of words for the community word cloud 
export function communityWordCloudList() {
    const dbRef = ref(db, `community/posts`);

    return get(dbRef).then((snapshot) => {
        const wordCloud = [];

        snapshot.forEach((postSnapshot) => {
            const post = postSnapshot.val();
            wordCloud.push(post.Headline);
        });
        return wordCloud;
    }).catch((error) => {
        console.error('Error getting data:', error);
        throw error;
    });
}