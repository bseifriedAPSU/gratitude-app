import "./login.css"
import React, { useEffect, useState } from 'react'
import { signIn, auth, provider } from "./../../firebase/database.js"
import { onAuthStateChanged, signInWithRedirect } from 'firebase/auth'

import Header from "../../components/Header"
export default function Login() {

    const googleSignIn = () => {
        signInWithRedirect(auth, provider);
    };

    //const [user, setUser] = useState(null);

    /*useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                window.location.href = '/home';
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);*/
    
    return (
        <div className="login">

            <Header />
        
            <button className="login-with-google-btn" onClick={googleSignIn}>
                Sign in with Google
            </button>

        </div>

    )
    }
