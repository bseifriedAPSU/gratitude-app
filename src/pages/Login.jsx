import "../css/pages.css";
import React, { useEffect } from 'react'
import { signIn, userAccountCheck, getUsername, getUserImage } from "./../firebase/databaseUser"
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

                            // getting user image # and setting to localstorage
                            getUserImage().then((data) => {
                                localStorage.setItem('UserImage', data);
                            });
                            localStorage.setItem('isAuth', true.toString());
                            window.location.href = '/home'
                        } else {
                            localStorage.removeItem('wordCloudList');
                            localStorage.setItem('isAuth', true.toString());
                            localStorage.setItem('isUser', false.toString());
                            window.location.href = '/newUser'
                        }
                    })
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            await signIn();
            // The sign-in result will be handled by the onAuthStateChanged listener
        } catch (error) {
            console.error("Error signing in", error.message);
        }
    };

    return (
        <div className="login-Container">

            <Header />

            <button className="loginButton" onClick={handleSignIn}>
                Sign in with Google
            </button>

        </div>

    )
}
