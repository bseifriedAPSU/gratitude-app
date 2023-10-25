const express = require('express');
const app = express();
const port = 5000;

import { admin } from 'firebase-admin';

import serviceAccount from '../../.././database-test-626d7-firebase-adminsdk-90ahz-ca3617c63a.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://database-test-626d7-default-rtdb.firebaseio.com"
});

var db = admin.database();
app.get('./getFirebaseData', (req, res) => {
    const ref = ref(db, 'users');
    ref.once('value', (snapshot) => {
        const data = snapshot.val();
        res.json(data);

    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})