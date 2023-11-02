import "./login.css"
import React, { useState, useEffect } from 'react'
import { signIn, userAccountCheck } from "./../../firebase/database.js"
import { auth } from './../../firebase/firebaseConfig.js'
import Header from "../../components/Header"
export default function Login() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('uid', auth.currentUser.uid);
                userAccountCheck(localStorage.getItem('uid'))
                    .then((accountExists) => {
                        if (accountExists) {
                            window.location.href = '/home'
                        } else {
                            window.location.href = '/newUser'
                        }
                    })
            }
            else {
                setUser(null);
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
