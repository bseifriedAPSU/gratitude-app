import "./login.css"
import React, { useState, useEffect } from 'react'
import { signIn } from "./../../firebase/database.js"
import { auth } from './../../firebase/firebaseConfig.js'
import Header from "../../components/Header"
export default function Login() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                localStorage.setItem('uid', auth.currentUser.uid);
                window.location.href = "/home";

            } else {
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
