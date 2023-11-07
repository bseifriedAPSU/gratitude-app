import "./login.css"
import React, { useState, useEffect } from 'react'
import { signIn, userAccountCheck, getUsername, getUserImage } from "./../../firebase/databaseUser"
import { auth } from './../../firebase/firebaseConfig'
import Header from "../../components/Header"
export default function Login() {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('uid', auth.currentUser.uid);

                userAccountCheck(localStorage.getItem('uid'))
                    .then((accountExists) => {
                        if (accountExists) {
                            localStorage.removeItem('isUser');
                            localStorage.setItem('isUser', true);
                            getUsername().then((data) => {
                                localStorage.removeItem('Username');
                            localStorage.setItem('Username', data); 
                            });
                            // getting user image # and setting to localstorage
                            getUserImage().then((data) => {
                                localStorage.setItem('UserImage', data);
                            });
                            window.location.href = '/home'
                        } else {
                            localStorage.setItem('isUser', false);
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

            <button className="login-with-google-btn" onClick={signIn}>
                Sign in with Google
            </button>

        </div>

    )
}
