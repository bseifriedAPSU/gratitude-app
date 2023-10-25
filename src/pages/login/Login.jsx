import "./login.css"
import React, { useState } from 'react'
import { signIn } from "./../../firebase/database.js"

import Header from "../../components/Header"
export default function Login() {
    return (
        <div className="login">

            <Header />
        
            <button className="login-with-google-btn" onClick={firebaseAuthentication() }>
                Sign in with Google
            </button>

        </div>

    )
    }
