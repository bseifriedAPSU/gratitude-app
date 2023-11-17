import "../css/pages.css";
import React, { useEffect } from 'react'
import { signIn, userAccountCheck, getUsername, getUserImage } from "./../firebase/databaseUser"
import { wordCloudList } from '../firebase/databaseHomepage'
import { auth } from '../firebase/firebaseConfig'
import Header from "../components/Header"

export default function Login() {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('uid', auth.currentUser.uid);

                userAccountCheck(localStorage.getItem('uid'))
                    .then((accountExists) => {
                        if (accountExists) {

                            //set isUser to true if the user currently exists 
                            localStorage.removeItem('isUser');
                            localStorage.setItem('isUser', true.toString());

                            //get the username for the user and set it to local storage 
                            getUsername().then((data) => {
                                localStorage.removeItem('Username');
                            localStorage.setItem('Username', data); 
                            });

                            //set the word cloud list to local storage 
                            wordCloudList(localStorage.getItem('uid'))
                                .then((data) => {
                                    localStorage.setItem('wordCloudList', JSON.stringify(data));
                                    console.log("Data from login setStorage:",data);
                                }).catch((error) => {
                                    console.log(error);
                                });

                            // getting user image # and setting to localstorage
                            getUserImage().then((data) => {
                                localStorage.setItem('UserImage', data);
                            });
                            window.location.href = '/home'
                        } else {
                            localStorage.setItem('isUser', false.toString());
                            window.location.href = '/newUser'
                        }
                    })
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="login">

            <Header />

            <button className="loginButton" onClick={signIn}>
                Sign in with Google
            </button>

        </div>

    )
}
